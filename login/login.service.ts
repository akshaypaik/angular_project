import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { userListModel } from '../models/usersList.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  public getUsers(): Observable<userListModel>{
    return this.http.get<userListModel>('./assets/data.json');
  }
}
