import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { TimesheetService } from '../../timesheet.service';

@Component({
    selector: 'create-timesheet-modal',
    templateUrl: 'create-timesheet.modal.html',
    styleUrls: ['create-timesheet.modal.scss']
})

export class CreateTimesheetModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    @Input() providerId: number;
    @Input() employId: number;
    constructor(private _timesheetService: TimesheetService) { }

    ngOnInit() {
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
            .subscribe((data) => {
                console.log(data);

            })
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}