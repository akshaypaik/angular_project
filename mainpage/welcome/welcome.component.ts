import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { userListModel } from 'src/app/models/usersList.model';
import { usersModel } from 'src/app/models/users.model';
import { FormGroup, FormControl } from '@angular/forms';
import { taskModel } from 'src/app/models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public loginForm: FormGroup;
  public showLogin: boolean = false;
  public showDetails: boolean = false;
  public showError: boolean = false;
  public users: usersModel[] = [];
  public tasks: taskModel[] = [];
  public userName: string;
  public showProducts: boolean = false;
  public loginTime: number;
  public aura: string;
  public ube: string;

  constructor(private service:LoginService, private router: Router) {
    setInterval(() => {
      this.loginTime = Date.now();
    },1);
   }

  ngOnInit(): void {
    this.setForm();
  }

  public setForm(){
    this.loginForm = new FormGroup({
      username : new FormControl(null),
      password : new FormControl(null)

    });
  }


  public callProducts(){
    if(this.showDetails){
      this.showProducts = true;
    }else{
      this.showError = true;
    }
  }

}
