import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { userListModel } from 'src/app/models/usersList.model';
import { usersModel } from 'src/app/models/users.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { taskModel } from 'src/app/models/task.model';
import { constants } from '../constants/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showLogin: boolean = false;
  public showDetails: boolean = false;
  public showError: boolean = false;
  public users: usersModel[] = [];
  public userName: string;
  public showProducts: boolean = false;
  public loginTime: number;
  public showHome: boolean = false;
  public tasks: usersModel[] = [];
  public taskdonestatus: taskModel[] = [];
  public taskinprogressstatus: taskModel[] = [];
  public taskdone: string;
  public taskinprogress: string;
  public showLoginPage: boolean = true;
  public disableSubmitButton: boolean = false;
  public finalDone: string[] = [];
  public finalPending: string[] = [];

  constructor(private service:LoginService, private router: Router) {
    setInterval(() => {
      this.loginTime = Date.now();
    },1);
   }

  ngOnInit(): void {
    this.setForm();
    this.getLoginDetails();
    this.setSubmitButton();
    this.formValueChanges();
  }

  public setForm(){
    this.loginForm = new FormGroup({
      username : new FormControl(null, [Validators.required, Validators.pattern(constants.emailPattern)]),
      password : new FormControl(null, Validators.required)

    });
  }

  public callLogin(){
    this.showLogin = true;
  }

  public getLoginDetails(){
    //let userOne: userListModel;
    let userDetails: usersModel;
    let tasksdone: taskModel;
    let tasksinprogress: taskModel;
      this.service.getUsers().subscribe(response=> {
        //userOne.userData = response.userData; 
        response.userData.forEach(items=>{
          userDetails = new usersModel();
          tasksdone = new taskModel();
          tasksinprogress = new taskModel();
          userDetails.username = items.username;
          userDetails.password = items.password;
          this.users.push(userDetails);
          tasksdone = items.tasksdone[0];
          tasksinprogress = items.tasksinprogress[0];
          this.taskdonestatus.push(tasksdone);
          this.taskinprogressstatus.push(tasksinprogress);
        });
      });
        console.log(this.users);
  }

  public showLoginDetails(){
    this.showDetails = false;
    this.showError = false;
    for(let i = 0; i < this.users.length ; i++){
      if((this.loginForm.get('username').value == this.users[i].username) && (this.loginForm.get('password').value == this.users[i].password)){
        this.showDetails = true;
        this.showLoginPage = false;
        this.userName = this.users[i].username;
        if(this.users[i].username == this.taskdonestatus[i].taskOwner){
          if(typeof(this.taskdonestatus[i].aura)!= 'undefined'){
            this.taskdone = this.taskdonestatus[i].aura;
            this.finalDone.push(this.taskdone);
          }
          if(typeof(this.taskdonestatus[i].ube)!= 'undefined'){
            this.taskdone = this.taskdonestatus[i].ube;
            this.finalDone.push(this.taskdone);
          }
          if(typeof(this.taskdonestatus[i].access)!= 'undefined'){
            this.taskdone = this.taskdonestatus[i].access;
            this.finalDone.push(this.taskdone);
          }
          if(typeof(this.taskdonestatus[i].blacklisting)!= 'undefined'){
            this.taskdone = this.taskdonestatus[i].blacklisting;
            this.finalDone.push(this.taskdone);
          }
          if(typeof(this.taskdonestatus[i].catalog)!= 'undefined'){
            this.taskdone = this.taskdonestatus[i].catalog;
            this.finalDone.push(this.taskdone);
          }
          if(typeof(this.taskdonestatus[i].content)!= 'undefined'){
            this.taskdone = this.taskdonestatus[i].content;
            this.finalDone.push(this.taskdone);
          }
        } 
        if(this.users[i].username == this.taskinprogressstatus[i].taskOwner){
          if(typeof(this.taskinprogressstatus[i].aura)!= 'undefined'){
            this.taskinprogress = this.taskinprogressstatus[i].aura;
            this.finalPending.push(this.taskinprogress);
          }
          if(typeof(this.taskinprogressstatus[i].ube)!= 'undefined'){
            this.taskinprogress = this.taskinprogressstatus[i].ube;
            this.finalPending.push(this.taskinprogress);
          }
          if(typeof(this.taskinprogressstatus[i].access)!= 'undefined'){
            this.taskinprogress = this.taskinprogressstatus[i].access;
            this.finalPending.push(this.taskinprogress);
          }
          if(typeof(this.taskinprogressstatus[i].blacklisting)!= 'undefined'){
            this.taskinprogress = this.taskinprogressstatus[i].blacklisting;
            this.finalPending.push(this.taskinprogress);
          }
          if(typeof(this.taskinprogressstatus[i].catalog)!= 'undefined'){
            this.taskinprogress = this.taskinprogressstatus[i].catalog;
            this.finalPending.push(this.taskinprogress);
          }
          if(typeof(this.taskinprogressstatus[i].content)!= 'undefined'){
            this.taskinprogress = this.taskinprogressstatus[i].content;
            this.finalPending.push(this.taskinprogress);
          }
        }
        console.log('Done :' + this.finalDone);
        console.log('Pending :' + this.finalPending);
        break;
      }
      else{
        this.showError = true;
      }
    }
    
  }

  public callProducts(){
    if(this.showDetails){
      this.showProducts = true;
    }else{
      this.showError = true;
    }
  }

  public callLogOff(){
    this.showDetails = false;
  }

  public callRegister(){
    this.router.navigateByUrl('/register');
  }

  public formValueChanges(){
    this.loginForm.get('username').valueChanges.subscribe( result => {
      if(this.loginForm.get('username').valid){
        this.loginForm.valid;
        this.disableSubmitButton = false;
      }else{
        this.disableSubmitButton = true;
      }
    });
    this.loginForm.valueChanges.subscribe(result => {
      this.setSubmitButton();
    });
  }

  setSubmitButton(){
    if(!this.loginForm.valid){
      this.disableSubmitButton = true;
    }else{
      this.disableSubmitButton = false;
    }
  }


}
