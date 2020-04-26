import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../domain/User";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getUser(email: string, password: string): Observable<User> {
    console.log('Este in servie-login');
    const url = 'http://localhost:8080/user';
    console.log(url);
    return this.http.post<User>(url, {email, password}, this.httpOptions);
  }


}
