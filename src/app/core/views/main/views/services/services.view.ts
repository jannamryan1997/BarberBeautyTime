import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IService } from 'src/app/core/models/service';
import { UserService } from 'src/app/core/services/user.service';
import { CreateServiceModalComponent } from './modals';
import { ServicesService } from './services.service';

@Component({
    selector: 'app-services',
    templateUrl: 'services.view.html',
    styleUrls: ['services.view.scss']
})

export class ServicesViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    private service_provider_pk;
    private employee_pk: number;
    public loading = false;
    public message: string;
    public servicesDetails: IService[] = [];

    constructor(private _servicesService: ServicesService, private _userService: UserService, private _modalSrvice: NzModalService) {
        this.employee_pk = this._userService.getUserSync().additional_data?.employee?.id;
        this.service_provider_pk = this._userService.getUserSync().additional_data?.employee?.service_provider;
    }

    ngOnInit(): void {
        this._getAllService();
    }

    private _getAllService(): void {
        this.loading = true;
        this._servicesService.getAllService(this.service_provider_pk, this.employee_pk)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: IService[]) => {
                this.servicesDetails = data;
            },
                err => {
                    this.message = err.message;
                }
            );
    }
    private _deletedService(serviceId): void {
        this.loading = true;
        this._servicesService.deletedService(this.service_provider_pk, this.employee_pk, serviceId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._getAllService();

            },
                err => {
                    this.message = err.message;
                }
            );

    }
    public onClickOpenCreateServiceModal(serviceId: number): void {
        const dialogRef = this._modalSrvice.create({
            nzTitle: 'Create Service',
            nzContent: CreateServiceModalComponent,
            nzComponentParams: { service_provider_pk: this.service_provider_pk, employee_pk: this.employee_pk, serviceId }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'createService' || data === 'editService') {
                this._getAllService();
            }

        });
    }


    public onClickdeletedServices(servicesId: number): void {
        const dialogRef = this._modalSrvice.create({
            nzContent: ConfirmDeleteModal,
            nzFooter: 'false',
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'delete') {
                this._deletedService(servicesId);
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
