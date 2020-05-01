import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  
  public message: string ='';
  public ticketNr: string = '';

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.message = data.message;
    this.ticketNr = data.ticketNr;
   }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
}

}
