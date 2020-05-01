import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { constants } from '../constants/constants';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  public taskForm: FormGroup;
  public disableSubmitButton: boolean = false;
  public successSave: boolean = false;
  public ticketNr: string = '';

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
    this.setSaveButton();
    this.formValueChanges();
  }

  public setForm(){
    this.taskForm = new FormGroup({
      shortline: new FormControl(null, Validators.required),
      description : new FormControl(null, Validators.required),
      ticketnumber: new FormControl(null, [Validators.required, Validators.pattern(constants.ticketPattern)]),
      id : new FormControl(null, [Validators.required,Validators.pattern(constants.pidPatttern)]),
      startdate : new FormControl(null, Validators.required),
      enddate : new FormControl(null, Validators.required)
    });
  }

  public formValueChanges(){
    this.taskForm.valueChanges.subscribe(result => {
      this.setSaveButton();
      if(!this.taskForm.valid){
        this.successSave = false;
      }
      if(this.taskForm.get('ticketnumber').value != null && this.taskForm.get('ticketnumber').valid){
        this.ticketNr = this.taskForm.get('ticketnumber').value;
      }
    });
  }

  public setSaveButton(){
    if(!this.taskForm.valid){
      this.disableSubmitButton = true;
    }else{
      this.disableSubmitButton = false;
    }
  }

  public onSave(){
    this.successSave = true;
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        message: "Successfully saved",
        ticketNr: this.ticketNr
    };

    this.dialog.open(MessageDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/login');
    });
  } 
}
