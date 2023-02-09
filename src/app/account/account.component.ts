import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from './account.service';
import { AccountModel } from './account.model';
import { default as swal } from 'sweetalert2';
import * as moment from 'moment';
import { LoginidService } from '@app/auth/loginid.service';
import { UserModel } from '@app/user/user.model';
import { UserService } from '@app/user/user.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  userList: any = [];
  accountHistoryList!: AccountModel[];
  entity: AccountModel = {};
  id!: string;
  date = new Date();
  responseId!: string;
  userEntity: UserModel = {};

  constructor(
    private accountService: AccountService,
    private loginidService: LoginidService,
    private userService: UserService
  ) {}

  public stateList: any = [
    { id: 'Johor', stateName: 'Johor' },
    { id: 'Kedah', stateName: 'Kedah' },
    { id: 'Kelantan', stateName: 'Kelantan' },
    { id: 'Kelantan', stateName: 'Kuala Lumpur' },
    { id: 'Labuan', stateName: 'Labuan' },
    { id: 'Melaka', stateName: 'Melaka' },
    { id: 'Negeri Sembilan', stateName: 'Negeri Sembilan' },
    { id: 'Pahang', stateName: 'Pahang' },
    { id: 'Pulau Pinang', stateName: 'Pulau Pinang' },
    { id: 'Perak', stateName: 'Perak' },
    { id: 'Perlis', stateName: 'Perlis' },
    { id: 'Sabah', stateName: 'Sabah' },
    { id: 'Selangor', stateName: 'Selangor' },
    { id: 'Terengganu', stateName: 'Terengganu' },
    { id: 'Sarawak', stateName: 'Sarawak' },
  ];

  // to transfer money to other
  onTransfer(obj: any) {
    if (
      !obj.amount ||
      obj.amount.toString().trim() === '' ||
      !obj.sender ||
      obj.sender.trim() === '' ||
      !obj.recipient ||
      obj.recipient.trim() === ''
    ) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Amount, receiver, and recipient must not be empty.',
        showConfirmButton: true,
      });
      return;
    }

    if (obj.amount > this.userEntity ? this.userEntity.bankAccountBalance : 0) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Amount must not be greater than account balance.',
        showConfirmButton: true,
      });
      return;
    }
    let request = this.accountService.transferMoney(obj);
    request.subscribe(
      (res: any) => {
        this.getAccountHistory(obj.id);
        this.getUserId();
        swal.fire({
          icon: 'success',
          title: 'Successfully transferred',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer);
          },
        });
        obj.amount = '';
        obj.sender = '';
        obj.recipient = '';
      },
      (error: any) => {
        swal.fire({
          icon: 'error',
          title: 'Failed to transfer',
          text: error.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer);
          },
        });
      }
    );
  }

  // to get all transaction
  getAccountHistory(id?: string) {
    this.accountService.getAllAccountHistory(id).subscribe((res: any) => {
      console.log(res);
      this.accountHistoryList = res;
      this.accountHistoryList = this.accountHistoryList.sort((a: any, b: any) => {
        const aDatetime: any = new Date(a.datetime);
        const bDatetime: any = new Date(b.datetime);
        return bDatetime - aDatetime;
      });
      this.accountHistoryList.map((element: any) => {
        element.datetime = element.datetime ? moment(element.datetime).format('YYYY-MM-DD, h:mm:ss a') : null;
        console.log(element.datetime);
        return element;
      });
    });
  }

  // to get id from user logged in
  getUserId() {
    this.userService.getUserById(this.responseId).subscribe((res: UserModel) => {
      this.userEntity = res;
    });
  }

  ngOnInit(): void {
    this.getAccountHistory();
    this.responseId = this.loginidService.getResponseId();
    this.getUserId();
  }
}
