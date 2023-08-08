import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLogginMode = true;
  isLoading = false;
  error=null;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService:AuthService, 
    private router: Router){}

  onSwitchMode(){
    this.isLogginMode = !this.isLogginMode
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading= true;
    if(this.isLogginMode){
      authObs= this.authService.login(email, password);
      this.router.navigate(['/'])
    }else{
     authObs= this.authService.signup(email, password);
    }
    authObs.subscribe({
      next:(resData)=>{
        console.log(resData);
        this.isLoading = false;
      },
      error:(errorMessage)=>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    })
    form.reset();
  }
  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message:string){
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const compRef = hostViewContainerRef.createComponent(AlertComponent);
    compRef.instance.message = message;
    this.closeSub=compRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
