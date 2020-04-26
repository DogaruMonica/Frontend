import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnChanges {

  error: boolean;
  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.error = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.error = false;
    console.log("change");
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.user.username.valueChanges.subscribe(() => this.error = false);
    this.user.password.valueChanges.subscribe(() => this.error = false);
  }

  get user() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.getUser(this.user.username.value, this.user.password.value);
    this.error = false;
  }

  getUser(username: string, password: string) {

    this.loginService.getUser(username, password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('userId', JSON.stringify(data.id));
        if (data.role == "admin") {
          this.router.navigateByUrl('/admin');
        } else if (data.role == "teacher") {
          this.router.navigateByUrl('/teacher');
        } else {
          this.router.navigateByUrl('/pupil');
        }

      },
      () => {
        this.error = true;
      }
    );

  }

}
