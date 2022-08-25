import { Directive, ElementRef, Renderer2 } from "@angular/core";


@Directive({
  selector: '[progressWidth]'
})
export class ProgressBarDirective {

  c = 0;
  constructor(
    el: ElementRef,
    renderer: Renderer2
  ) {
    let barInterval = setInterval(() => {
       renderer.setStyle(el.nativeElement, 'width', this.c+'%')
      this.c++;
      if (this.c === 101) {
         clearInterval(barInterval)
      }

     }, 50)
  }



}
