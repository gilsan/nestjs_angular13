import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@ngshop/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { IUser } from '../../../models/users.model';

@Component({
  selector: 'ngshop-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: IUser[] = [];
  countries: { id: string, name: string }[] = [];
  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private userSerive: UserService,
  ) { }

  ngOnInit(): void {
    this.countries = this.userSerive.getCountry()

    this.loadData();
  }

  loadData() {
    this.userSerive.getUsers()
      .pipe(
        map(lists => lists.map(list => {
          const idx = this.countries.findIndex(country => country.id === list.country);
          if (idx === -1) {
            return list;
          }
          const fullname = this.countries[idx].name;
          const { country, ...restinfo } = list;
          return { ...restinfo, country: fullname }
        }))
      )
      .subscribe(data => {
        this.users = data;
      })
  }

  addUser() {
    this.router.navigate(['/users', 'form']);
  }

  updateUser(id: number) {
    console.log('[update]', id);
    this.router.navigate(['/users', 'form', id]);

  }

  deleteUser(id: number) {
    console.log('[delete]', id);
    this.confirmationService.confirm({
      message: '삭제 하시겠습니까?',
      header: '확인',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.userSerive.deleteUser(id)
          .subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: '삭제 했습니다.' });
          })
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: '취소 했습니다.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: '취소 했습니다.' });
            break;
        }
      }
    });
  }







}
