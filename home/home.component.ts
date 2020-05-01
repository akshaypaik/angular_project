import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  public showDetails: boolean = false;

  public showError: boolean = false;
  
  public loginTime: number;
  
  @Input()
  public userName: string;

  @Input()
  public taskdone: string;

  @Input()
  public taskinprogress: string;

  @Input()
  public finalDone: string[];

  @Input()
  public finalPending: string[];

  public showLoginDetails: boolean = false;
  public showTaskDetails: boolean = false;


  constructor(private router: Router) {
    setInterval(() => {
      this.loginTime = Date.now();
    },1);
   }

  ngOnInit(): void {
    
  }

  clickLogin(){
    this.showLoginDetails = !this.showLoginDetails;
  }

  clickTask(){
    this.showTaskDetails = !this.showTaskDetails;
  }

  clickCreateTask(){
    this.router.navigateByUrl('/createtask');
  }



}
