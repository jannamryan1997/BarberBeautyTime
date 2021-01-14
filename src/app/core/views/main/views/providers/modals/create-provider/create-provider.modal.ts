import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Icordination } from 'src/app/core/models/cordination';
import { IProvider, IProvidersType } from 'src/app/core/models/provider';
import { mapStyle } from 'src/assets/styles/_map_style';
import { ProvidersService } from '../../providers.service';

declare const google;
@Component({
    selector: 'app-create-provider',
    templateUrl: 'create-provider.modal.html',
    styleUrls: ['create-provider.modal.scss']
})

export class CreateProviderModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    private _latitude:string="55.751244";
    private _longitude:string="37.618423";
    private _map;
    private _marker;
    public loading=false;
    public message:string;
    public type:IProvidersType[] = [
        {name: 'Barber shop', value: 'B'},
        {name: 'Beauty salon', value: 'S'},
        {name: 'Individual', value: 'I'},

    ];

    public providerForm:FormGroup;

    constructor(private _fb:FormBuilder,private _providersService:ProvidersService,private _dialogRef:NzModalRef) { }

    ngOnInit() { 
        this._forBuilder();
        this._initMap();
    }


    private _forBuilder():void{
        this.providerForm=this._fb.group({
            name:['',Validators.required],
            type:['',Validators.required],
            region:['']
        })
    }


    private _initMap() {
        this._map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 55.751244, lng: 37.618423 },
          zoom: 6,
          styles: mapStyle
        });
        this._marker = new google.maps.Marker({
          map: this._map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: { lat: -34.397, lng: 150.644 },
          icon: '/assets/icons/marker.png'
        });
      }
    

  public  submitForm(): void {
        for (const i in this.providerForm.controls) {
            this.providerForm.controls[i].markAsDirty();
            this.providerForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickCreateProvider():void{
        this.loading = true;
        const{
            name,   
            region,
        }=this.providerForm.value;
        const providerDetails:IProvider={
            name,
            type:this.providerForm.value.type.value,
            region:Number(region),
            latitude:this._latitude,
            longitude:this._longitude,
        }
        this._providersService.createProvider(providerDetails)
        .pipe(takeUntil(this._unsubscribe$),
        finalize(()=>{
            this.loading = false;
        })
        )
        .subscribe((data)=>{
            console.log(data);
            this._dialogRef.destroy('provider Create1');
        },
        err=>{
            this.message= err.message;
        }
        )
    }


    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}