import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IEmployees } from 'src/app/core/models/employees';
import { EmployeeService } from './employee.service';
import { AddEmployeModalComponent } from './modals';

@Component({
    selector: 'app-employee',
    templateUrl: 'employee.view.html',
    styleUrls: ['employee.view.scss']
})

export class EmployeeViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public employeesDetails: IEmployees[] = [];
    public message: string;
    private _providerId: number;

    constructor(
        private _employeeService: EmployeeService,
        private _activatedRoute: ActivatedRoute,
        private _viewContainerRef: ViewContainerRef,
        private _modalService: NzModalService,
        private _router: Router,
    ) {
        const providerId = this._activatedRoute.snapshot.params?.id || null;
        if (providerId) {
            this._providerId = providerId;
            this._getEmployees(providerId);
        }
    }

    ngOnInit(): void { }

    private _getEmployees(id): void {
        this.loading = true;
        this._employeeService.getEmployees(id)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: IEmployees[]) => {
                this.employeesDetails = data;
            },
                err => {
                    this.message = err.error.message;

                }
            );
    }


    private _deteEmploye(employeId: number): void {
        this._employeeService.deleteEmploye(this._providerId, employeId)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((data) => {
                this._getEmployees(this._providerId);
            });
    }

    public onClickDeleteEmploye(employeId: number): void {

        const dialogRef = this._modalService.create({
            nzContent: ConfirmDeleteModal
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'delete') {
                this._deteEmploye(employeId);
            }
        });
    }

    public onClickOpenAddEmployeModal(): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Add an Employe',
            nzContent: AddEmployeModalComponent,
            nzFooter: 'false',
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: {
                providerId: this._providerId,
            }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'AddEmploye') {
                this._getEmployees(this._providerId);
            }
        });
    }

    public onClickOpenCreateEmployeModal(employeId: number): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Create Employe',
            nzContent: AddEmployeModalComponent,
            nzFooter: 'false',
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: {
                providerId: this._providerId,
                employeId
            }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'deletedEmploye'){
                 this._getEmployees(this._providerId);
            }
        });
    }

    public onClickBooking(employId: number): void {
        this._router.navigate([`timesheet/${this._providerId}/${employId}`]);
    }


    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
