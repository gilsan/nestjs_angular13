import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  email = '';
  exp = '';
  constructor(
    private authService: AuthService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    const isAPIUrl = req.url.startsWith('http://localhost:3000');

    if (token) {
      const tokenDecode = JSON.parse(atob(token!.split('.')[1]));
      this.email = tokenDecode.email;
      this.exp = tokenDecode.exp;
      // console.log(tokenDecode);
    }

    if (req.url.indexOf('/refresh') > -1) {
      return next.handle(req);
    }

    if (token && isAPIUrl) {
      if (Date.now() < Number(this.exp) * 1000) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(req);
      }

      return this.authService.refresh(this.email).pipe(
        switchMap((newToken: any) => {
          const token = newToken.token;
          localStorage.removeItem('token');
          localStorage.setItem('token', token);
          // console.log('[newToken]', token);
          const transformedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
          return next.handle(transformedReq);
        })

      );
    }

    return next.handle(req);
  }

}
