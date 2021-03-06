import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IEmployees } from 'src/app/core/models/employees';
import { MenuService } from 'src/app/core/services/menu.service';
import { EmployeeService } from './employee.service';
import { AddEmployeModalComponent } from './modals';

@Component({
    selector: 'app-employee',
    templateUrl: 'employee.view.html',
    styleUrls: ['employee.view.scss']
})

export class EmployeeViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public providerId: number;
    public loading = false;
    public employeesDetails: IEmployees[] = [];
    public message: string;
    public localImage = '/assets/images/hairdresser.jpeg';

    constructor(
        private _employeeService: EmployeeService,
        private _activatedRoute: ActivatedRoute,
        private _viewContainerRef: ViewContainerRef,
        private _modalService: NzModalService,
        private _menuService: MenuService,
        private _translate: TranslateService
    ) {
        const providerId = this._activatedRoute.snapshot.params?.id || null;
        if (providerId) {
            this.providerId = providerId;
            this._getEmployees(providerId);
        }
        this._menuService.setPageTitle('Employees');
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
                    this.message = err.message;

                }
            );
    }


    public onClickOpenAddEmployeModal(): void {
        const nzTitle = this._translate.instant('Add Employee');
        const dialogRef = this._modalService.create({
            nzTitle,
            nzContent: AddEmployeModalComponent,
            nzFooter: 'false',
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: {
                providerId: this.providerId,
            }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'AddEmploye') {
                this._getEmployees(this.providerId);
            }
        });
    }

    public onClickDeleteEmployee(event): void {
        if (event) {
            this._getEmployees(this.providerId);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
