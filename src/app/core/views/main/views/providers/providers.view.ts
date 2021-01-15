import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IProvider, IProviderDetails, } from 'src/app/core/models/provider';
import { CreateProviderModalComponent } from './modals';
import { ProvidersService } from './providers.service';

@Component({
    selector: 'app-providers',
    templateUrl: 'providers.view.html',
    styleUrls: ['providers.view.scss'],
})

export class ProvidersViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public message: string;
    public type:string;
    public searchCtrl:FormControl =new FormControl(null);
    public providersData:IProvider[] =[];

    constructor(private _modalService: NzModalService, private _providersService: ProvidersService) { }

    ngOnInit() {
        this._getProviders();
        this._searchCtrlValueChanges();
    }



    private _searchCtrlValueChanges():void{
        this.searchCtrl.valueChanges.pipe(takeUntil(this._unsubscribe$))
        .subscribe((data)=>{
            if(data.length>3){
                this._getProviders();
            }
            this._getProviders();
        })
    }
    private _getProviders(): void {
        this.loading = true;
        let search:string= this.searchCtrl.value;
        this._providersService.getProviders(search)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data:IProviderDetails) => {
                this.providersData =data.results;
            },
                err => {
                }
            )

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
        })
    }

    public onClickOpenProviderModalById(providerId:number):void{
        const dialogRef =  this._modalService.create({
            nzTitle: 'Create Providers',
            nzContent: CreateProviderModalComponent,
            nzComponentParams:{data:providerId} as {},
        });
        
    }

    public onClickDeleteProvider(providerId:number):void{
const dialogRef=this._modalService.create({
    nzContent:ConfirmDeleteModal,
    nzFooter:'false',
})
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}