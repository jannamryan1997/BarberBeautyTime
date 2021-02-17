import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IProvider, IProviderDetails } from 'src/app/core/models/provider';
import {   CreateProviderModalComponent } from './modals';
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
    public pageLength = 1;
    public count: number;

    constructor(
        private _modalService: NzModalService,
        private _providersService: ProvidersService,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef,
        ) {
        }

    ngOnInit(): void {
        this._getProviders(1, this.pageLength);
        this._searchCtrlValueChanges();
    }



    private _searchCtrlValueChanges(): void {
        this.searchCtrl.valueChanges.pipe(takeUntil(this._unsubscribe$))
            .subscribe((data) => {
                if (data.length > 3) {
                    this._getProviders(1, this.pageLength);
                }
                this._getProviders(1, this.pageLength);
            });
    }
    private _getProviders(page, count): void {
        this.loading = true;
        const search: string = this.searchCtrl.value;
        this._providersService.getProviders(page, count, search)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: IProviderDetails) => {
                this.count = data.count;
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
                this._getProviders(1, this.pageLength);

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
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'provider Create') {
                this._getProviders(1, this.pageLength);
            }
        });
    }

    public onClickOpenProviderModalById(providerId: number): void {
        const dialogRef = this._modalService.create({
            nzTitle: 'Create Providers',
            nzContent: CreateProviderModalComponent,
            nzViewContainerRef: this._viewContainerRef,
            nzComponentParams: { providerId}

        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'provider Changed') {
                this._getProviders(1, this.pageLength);
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

    public onClickRouterEmployee(providerId: number): void{
        this._router.navigate([`employees/${providerId}`]);
    }

   public paginate($event): void {
        this._getProviders($event.pageNumber, this.pageLength);
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}




