import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { default as swal } from 'sweetalert2';
import { LoginidService } from '@app/auth/loginid.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userList: any = [];
  entity: UserModel = {};
  id: string | undefined;
  responseId!: string;

  constructor(private userService: UserService, private loginidService: LoginidService) {}

  public stateList: any = [
    { id: 'Johor', stateName: 'Johor' },
    { id: 'Kedah', stateName: 'Kedah' },
    { id: 'Kelantan', stateName: 'Kelantan' },
    { id: 'Kuala Lumpur', stateName: 'Kuala Lumpur' },
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

  // to get user by id
  getUserId() {
    this.userService.getUserById(this.responseId).subscribe((res: UserModel) => {
      this.entity = res;
    });
  }

  // to update user detail
  onSubmit(obj: any) {
    let request = this.userService.updateUserDetail(obj);
    request.subscribe(
      (res: any) => {
        res.name = this.entity.name;
        swal.fire({
          icon: 'success',
          title: 'User details saved successfully',
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
      },
      (error: any) => {
        swal.fire({
          icon: 'error',
          title: 'Failed to update user detail',
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

  ngOnInit(): void {
    this.responseId = this.loginidService.getResponseId();
    this.getUserId();
    console.log('res', this.responseId);
  }
}
