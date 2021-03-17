import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IEmployees } from 'src/app/core/models/employees';
import { EmployeeService } from '../../employee.service';
import { AddEmployeModalComponent } from '../../modals';

@Component({
    selector: 'employee-item-app',
    templateUrl: 'employee-item.component.html',
    styleUrls: ['employee-item.component.scss']
})

export class EmployeeItemComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public employeItem: IEmployees;
    public localImage = '/assets/images/hairdress.jpg';
    @Input() providerId: number;
    @Input('employeItem')
    set setemploye($event: IEmployees) {
        if ($event) {
            this.employeItem = $event;
            if ($event.user.avatar) {
                this.localImage = $event.user.avatar;
            }
        }
    }
    @Output() deleteEmployee = new EventEmitter<boolean>();

    constructor(
        private _router: Router,
        private _employeeService: EmployeeService,
        private _modalService: NzModalService,
        private _viewContainerRef: ViewContainerRef,
    ) {

    }

    ngOnInit(): void { }

    private _deteEmploye(employeId: number): void {
        this._employeeService.deleteEmploye(this.providerId, employeId)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((data) => {
                this.deleteEmployee.emit(true);
            });
    }

    public onClickDeleteEmploye(): void {

        const dialogRef = this._modalService.create({
            nzContent: ConfirmDeleteModal
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'delete') {
                this._deteEmploye(this.employeItem?.id);
            }
        });
    }

    public onClickOpenCreateEmployeModal(): void {
        const dialogRef = this._modalService.create({
            nzTitle: '    ',
            nzContent: AddEmployeModalComponent,
            nzFooter: 'false',
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: {
                providerId: this.providerId,
                employeId: this.employeItem?.id
            }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'deletedEmploye') {
                // this._getEmployees(this._providerId);
            }
        });
    }

    public onClickBooking(): void {
        this._router.navigate([`timesheet/${this.providerId}/${this.employeItem?.id}`]);
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
