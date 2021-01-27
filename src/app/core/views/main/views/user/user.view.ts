import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthUser } from 'src/app/core/models/auth-user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: 'user.view.html',
    styleUrls: ['user.view.scss']
})

export class UserViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public user:IAuthUser;
    public service_provider_id:string;

    constructor(private _userService:UserService,private _router:Router,private _cookieService:CookieService) { 
        let service_provider_id=this._cookieService.get('service_provider_id');
        if(service_provider_id){
            this.service_provider_id=service_provider_id;
        }
    }

    ngOnInit() {
        this._userService.fetchUser()
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((data:IAuthUser) => {
            this.user=data;
            ;
    
      });
     }

     public onClickBooking():void{
        this._router.navigate([`timesheet/${this.service_provider_id}/${this.user.additional_data.employee.id}`]);
            }
        

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}