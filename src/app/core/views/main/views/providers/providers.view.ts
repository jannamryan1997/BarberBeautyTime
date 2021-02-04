import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IProvider, IProviderDetails } from 'src/app/core/models/provider';
import { AddEmployeModalComponent, CreateEmployemodalComponent, CreateProviderModalComponent } from './modals';
import { ProvidersService } from './providers.service';

@Component({
    selector: 'app-providers',
    templateUrl: 'providers.view.html',
    styleUrls: ['providers.view.scss'],
})

export class ProvidersViewComponent implements OnInit, OnDestroy {
    expandSet = new Set<number>();
    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public message: string;
    public searchCtrl: FormControl = new FormControl(null);
    public providersData: IProvider[] = [];
    public typeValue: string;
    public ownerId: string;
    public service_provider_id: string;

    constructor(
        private _modalService: NzModalService,
        private _providersService: ProvidersService,
        private _viewContainerRef: ViewContainerRef,
        private _router: Router,
        ) {
        }

    ngOnInit(): void {
        this._getProviders();
        this._searchCtrlValueChanges();
    }



    private _searchCtrlValueChanges(): void {
        this.searchCtrl.valueChanges.pipe(takeUntil(this._unsubscribe$))
            .subscribe((data) => {
                if (data.length > 3) {
                    this._getProviders();
                }
                this._getProviders();
            });
    }
    private _getProviders(): void {
        this.loading = true;
        const search: string = this.searchCtrl.value;
        this._providersService.getProviders(search)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: IProviderDetails) => {
                this.providersData = data.results;
            },
                err => {
                }
            );

    }

    private _onClickDeleteProvider(providerId: number): void {
        this.loading = true;
        this._providersService.deletedProvider(providerId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data) => {
                this._getProviders();

            },
                err => {
                    this.message = err.error;
                }
            );
    }


    public onClickOpenCreateProviderModal(): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Create Providers',
            nzContent: CreateProviderModalComponent,
        })
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'provider Create') {
                this._getProviders();
            }
        });
    }

    public onClickOpenProviderModalById(providerId: number): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Create Providers',
            nzContent: CreateProviderModalComponent,
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: { providerId}

        })
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'provider Changed') {
                this._getProviders();
            }
        });
    }

    public onClickDeleteProvider(providerId: number): void {
        const dialogRef = this._modalService.create({
            nzContent: ConfirmDeleteModal,
            nzFooter: 'false',
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'delete') {
                this._onClickDeleteProvider(providerId);
            }

        });
    }

    public onClickOpenCreateEmployeModal(providerId: number, employeId: number): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Create Employe',
            nzContent: CreateEmployemodalComponent,
            nzFooter: 'false',
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: {
                providerId,
                employeId
            }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'deletedEmploye'){
                // this._getEmployees(providerId);
            }
        });
    }

    public onClickOpenAddEmployeModal(providerId: number): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Add an Employe',
            nzContent: AddEmployeModalComponent,
            nzFooter: 'false',
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: {
                providerId,
            }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'AddEmploye') {
                // this._getEmployees(providerId);
            }
        });
    }

    public onClickBooking(providerId: number, employId: number): void{
this._router.navigate([`timesheet/${providerId}/${employId}`]);
    }



    public onClickRouterEmployee(providerId: number): void{
        this._router.navigate([`employees/${providerId}`]);
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}




