import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  username: string;
  password: string;

  constructor(private loginService: LoginService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUser(this.username, this.password);
  }

  ngOnInit() {

  }

  getUser(username: string, password: string) {

    this.loginService.getUser(username, password).subscribe(
      response => {
        console.log(response);
       // localStorage.setItem('userId', JSON.stringify(response.id));
      }
    );

  }

}
