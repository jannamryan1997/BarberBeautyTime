import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IEmployees } from 'src/app/core/models/employees';
import { EmployeeService } from './employee.service';

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

    constructor(private _employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) {
        const providerId = this._activatedRoute.snapshot.params?.id || null;
        if (providerId){
            this._getEmployees(providerId);
        }
    }

    ngOnInit(): void {}

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
                console.log(this.employeesDetails);
            },
                err => {
                    this.message = err.error.message;

                }
            );
    }


    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
