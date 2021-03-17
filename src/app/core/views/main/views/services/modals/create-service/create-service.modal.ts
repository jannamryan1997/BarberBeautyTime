import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IService } from 'src/app/core/models/service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServicesService } from '../../services.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'create-service',
    templateUrl: 'create-service.modal.html',
    styleUrls: ['create-service.modal.scss']
})

export class CreateServiceModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public message: string;
    public serviceForm: FormGroup;
    public loading = false;
    public serviceDetail: IService;
    public sucssesMessage = 'This is a message of success';

    @Input() service_provider_pk: number;
    @Input() employee_pk: number;
    @Input() serviceId: number;

    constructor(
        private _fb: FormBuilder,
        private _modal: NzModalRef,
        private _message: NzMessageService,
        private _servicesService: ServicesService,
        private _translate: TranslateService,
    ) { }

    ngOnInit(): void {
        this._initForm();
        if (this.serviceId) {
            this._getServiceById();
        }
    }

    private _initForm(): void {
        this.serviceForm = this._fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            duration_in_minutes: ['', Validators.required]
        });
    }

    private _getServiceById(): void {
        this.loading = true;
        this._servicesService.getServiceById(this.service_provider_pk, this.employee_pk, this.serviceId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: IService) => {
                this.serviceDetail = data;
                this._setPatchValue();

            },
                err => {
                    this.message = err.message;
                }
            );
    }

    private _setPatchValue(): void {
        this.serviceForm.patchValue({
            name: this.serviceDetail.name,
            price: this.serviceDetail.price,
            duration_in_minutes: this.serviceDetail.duration_in_minutes,
        });
    }

    public submitForm(): void {
        for (const i in this.serviceForm.controls) {
            this.serviceForm.controls[i].markAsDirty();
            this.serviceForm.controls[i].updateValueAndValidity();
        }
    }

    public onCreateService(): void {
        this.loading = true;
        const {
            name,
            price,
            duration_in_minutes,
        } = this.serviceForm.value;
        const serviceDetails: IService = {
            name,
            price,
            duration_in_minutes,
        };
        this._servicesService.createService(serviceDetails, this.service_provider_pk, this.employee_pk)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                if (data) {
                    this._message.create('success', this._translate.instant(this.sucssesMessage));
                    this._modal.destroy('createService');
                }
            },
                err => {
                    this.message = err.message;
                }
            );

    }
    public onClickEditService(): void {
        this.loading = true;
        const {
            name,
            price,
            duration_in_minutes,
        } = this.serviceForm.value;
        const serviceDetails: IService = {
            name,
            price,
            duration_in_minutes,
        };
        this._servicesService.creteServiceById(serviceDetails, this.service_provider_pk, this.employee_pk, this.serviceId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._message.create('success', this._translate.instant(this.sucssesMessage));
                this._modal.destroy('editService');

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
