import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { EmployeData, IEmployees } from 'src/app/core/models/employees';
import { EmployeeService } from '../../employee.service';

@Component({
    selector: 'add-employe',
    templateUrl: 'add-employe.modal.html',
    styleUrls: ['add-employe.modal.scss']
})

export class AddEmployeModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm: FormGroup;
    public loading = false;
    public message: string;
    public employeDetails: IEmployees;
    @Input() providerId: number;
    @Input() employeId: number;
    constructor(private _fb: FormBuilder, private _employeeService: EmployeeService, private _modal: NzModalRef) { }


    ngOnInit(): void {
        this._initForm();
        if (this.employeId){
            this._getEmployeById();
        }
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            username: [null, Validators.required],
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });
    }

    private _setPatchValue(): void {
        this.validateForm.patchValue({
            first_name: this.employeDetails.user.first_name,
            last_name: this.employeDetails.user.last_name,
            // rating: this.employeDetails.rating,
        });
    }

    private _getEmployeById(): void {
        this._employeeService.getEmployeById(this.providerId, this.employeId)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((data: IEmployees) => {
                this.employeDetails = data;
                console.log( this.employeDetails);
                this._setPatchValue();

            });
    }

    public submitForm(): void {
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }

    public addEmploye(): void {
        this.loading = true;
        const {
            username,
            first_name,
            last_name,
            email,
            password,
        } = this.validateForm.value;

        const employeDetails: EmployeData = {
            username,
            first_name,
            last_name,
            email,
            password,
            service_provider: this.providerId
        };
        this._employeeService.addEmployees(employeDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._modal.destroy('AddEmploye');
            },
            err => {
                this.message = err.message;
            }
            );
    }

    public patchEmployee(): void {
        this.loading = true;
        const {
            first_name,
            last_name,
        } = this.validateForm.value;
        const employDetels: IEmployees = {
            id: this.employeDetails.id,
            service_provider: this.employeDetails.service_provider,
            user: {
                first_name,
                id: this.employeDetails.user.id,
                last_name,
            }
        };
        this._employeeService.putchEmploye(this.providerId, this.employeId, employDetels)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data) => {
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
