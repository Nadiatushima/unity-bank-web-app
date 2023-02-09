import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CredentialsService } from './credentials.service';
import { environment } from '@env/environment';
import { AuthenticationService } from './authentication.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { default as swal } from 'sweetalert2';
import { LoginidService } from './loginid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private credentialsService: CredentialsService,
    private httpClient: HttpClient,
    private loginidService: LoginidService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    const user = {
      loginId: this.loginForm.value.loginId,
      password: this.loginForm.value.password,
    };
    this.loginService.login(user).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.loginidService.setResponseId(res.id);
        const data = {
          loginId: user.loginId,
          password: user.password,
        };
        this.credentialsService.setCredentials(data, true);
        swal.fire({
          icon: 'success',
          title: 'Logged in successfully',
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
        this.router.navigate(['/user']);
      },
      (err: string | undefined) => {
        console.log('error', err);
        this.isLoading = false;
        this.error = err;
      }
    );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
