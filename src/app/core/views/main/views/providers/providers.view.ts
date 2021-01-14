import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IProvider, IProviderDetails, IProvidersType } from 'src/app/core/models/provider';
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
    public providersData:IProvider[] =[];

    constructor(private _modalService: NzModalService, private _providersService: ProvidersService) { }

    ngOnInit() {
        this._getProviders();
    }

    private _getProviders(): void {
        this.loading = true;
        this._providersService.getProviders()
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data:IProviderDetails) => {
                this.providersData =data.results;
            this.providersData.map((element,index)=>{
                console.log(element.type);
                if(element.type === 'B'){
                    this.type='Barber shop'
                    console.log(this.type);
                }
                 if(element.type === 'I'){
                    this.type='Individual'
                    console.log(this.type);
                }
                if(element.type === 'S'){
                    this.type='Beauty salon'   
                    console.log(this.type);
                }
                console.log(this.type);
                
            })

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

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}