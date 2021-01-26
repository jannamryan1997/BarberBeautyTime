import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ITimesheet } from 'src/app/core/models/timesheet';
import { TimesheetService } from './timesheet.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActionModal, CreateServiceModalComponent, CreateTimesheetModalComponent } from './modals';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-timesheet',
    templateUrl: 'timesheet.view.html',
    styleUrls: ['timesheet.view.scss']
})

export class TimesheetViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public providerId: number;
    public employId: number;
    public loading = false;
    public timesheetDetails: ITimesheet[] = [];
  public date;
  public owner:string;
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _timesheetService: TimesheetService,
        private _modalSrvice: NzModalService,
        private _datePipe: DatePipe,
        private _cookieService:CookieService
    ) {
        const providerId = this._activatedRoute.snapshot.params?.providerId || null;
        const employId = this._activatedRoute.snapshot.params?.employId || null;
        this.providerId = providerId;
        this.employId = employId;
        const owner =this._cookieService.get('ownerId');
        if(owner){
            this.owner=owner;
        }
         
    }

    ngOnInit() {
        
        if (this.providerId && this.employId) {
            const today = new Date();
            this._getTimesheet(today);
        }
    }

    private _getTimesheet(date): void {
         date = this._datePipe.transform(date,'yyyy-MM-dd');
         this.date=this._datePipe.transform(date,'MMMM d,y');
        this.loading = true;
        this._timesheetService.getEmployeesBookings(date,this.providerId, this.employId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data: ITimesheet[]) => {
                this.timesheetDetails = data;
            })

    }
    public onValueChange(value): void {
        this.date=this._datePipe.transform(value,'MMMM d,y');
        this._getTimesheet(value);

    }



    public onClickOpenCreateBookingModal(): void {
        const dialogRef = this._modalSrvice.create({
            nzTitle: 'Create Booking',
            nzContent: CreateTimesheetModalComponent,
            nzComponentParams: { providerId: this.providerId, employId: this.employId }
        })
    }

    public showModalAction(item:ITimesheet): boolean {
        if(item.reserved===true){
            this._modalSrvice.create({
                nzContent: ActionModal,
                nzComponentParams:{item:item}
            })
        }
        else{
            return false;
        }
       
        
    }

    public onClickOpenCreateServiceModal():void{
        const dialogRef=this._modalSrvice.create({
            nzTitle:'Create Service',
            nzContent:CreateServiceModalComponent,
            nzComponentParams: { providerId: this.providerId, employId: this.employId }
        })
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}