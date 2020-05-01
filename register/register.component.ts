import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { constants } from '../constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public successRegister: boolean;
  public registerForm: FormGroup;
  public disableSubmitButton: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setForm();
    this.formValueChanges();
    this.setSubmitButton();
  }

  public setForm(){
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.pattern(constants.emailPattern)]),
      password: new FormControl(null, Validators.required),
      confirmpassword: new FormControl(null, Validators.required)
    });
  }


  public onSubmit(){
    if(this.registerForm.valid){
      this.successRegister = true;
    }
  }

  public callLogin(){
    this.router.navigateByUrl('/login');
  }

  formValueChanges(){
    this.registerForm.get('confirmpassword').valueChanges.subscribe( result => {
      if(!(this.registerForm.get('password').value == this.registerForm.get('confirmpassword').value)){
        this.registerForm.get('confirmpassword').setErrors({ invalidcc: true});
        this.disableSubmitButton = true;
      }else{
        this.registerForm.get('confirmpassword').setErrors(null);
        if(this.registerForm.get('email').valid){
          this.registerForm.valid;
          this.disableSubmitButton = false;
        }
      }
    });
    this.registerForm.get('password').valueChanges.subscribe( result => {
      if(!(this.registerForm.get('password').value == this.registerForm.get('confirmpassword').value)){
        this.registerForm.get('confirmpassword').setErrors({ invalidcc: true});
        this.disableSubmitButton = true;
      }else{
        this.registerForm.get('confirmpassword').setErrors(null);
        if(this.registerForm.get('email').valid){
          this.registerForm.valid;
          this.disableSubmitButton = false;
        }
      }
    });
    this.registerForm.get('email').valueChanges.subscribe( result => {
      if(this.registerForm.get('email').valid){
        this.registerForm.valid;
        this.disableSubmitButton = false;
      }
    });
    this.registerForm.valueChanges.subscribe(result => {
      this.setSubmitButton();
    });
  }

  setSubmitButton(){
    if(!this.registerForm.valid){
      this.disableSubmitButton = true;
    }else{
      this.disableSubmitButton = false;
    }
  }

}
