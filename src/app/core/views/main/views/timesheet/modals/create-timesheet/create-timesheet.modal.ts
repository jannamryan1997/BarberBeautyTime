import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IBooking } from 'src/app/core/models/booking';
import { IService } from 'src/app/core/models/service';
import { TimesheetService } from '../../timesheet.service';

@Component({
    selector: 'create-timesheet-modal',
    templateUrl: 'create-timesheet.modal.html',
    styleUrls: ['create-timesheet.modal.scss']
})

export class CreateTimesheetModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public message: string;
  public serviceformCtrl: string;
  public serviceDetails: IService[];
    @Input() providerId: number;
    @Input() employId: number;
    @Input() bookingId: number;
    constructor(private _timesheetService: TimesheetService, private _modal: NzModalRef) { }

    ngOnInit(): void {
        if (this.providerId && this.employId) {
            this._getService();
        }
    }

    private _getService(): void {
        this._timesheetService.getServices(this.providerId, this.employId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: IService[]) => {
                this.serviceDetails = data;
            });
    }

    public createBooking(): void {
        this.loading = true;
        const bookingDetails: IBooking = {
            id: this.bookingId,
            services: this.serviceformCtrl,
        };
        this._timesheetService.createBooking(this.providerId, this.employId, bookingDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                    this._modal.destroy('createBooking');

            },
                err => {
                    this.message = err.error;
                }
            );
    }
    public deleteBooking(): void{
        this.loading = true;
        this._timesheetService.deleteBooking(this.providerId, this.employId, this.bookingId)
        .pipe(takeUntil(this._unsubscribe$),
        finalize(() => {
            this.loading = false;
        })
        )
        .subscribe((data) => {
            this._modal.destroy('deleteBooking');
        },
        err => {
            this.message = err.message;
        }
        );
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
