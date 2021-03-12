
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IProvider, IProvidersType } from 'src/app/core/models/provider';
import { IRegion } from 'src/app/core/models/region';
import { mapStyle } from 'src/assets/styles/_map_style';
import { ProvidersService } from '../../providers.service';
import { DatePipe } from '@angular/common';

declare const google;

@Component({
    selector: 'app-create-provider',
    templateUrl: 'create-provider.modal.html',
    styleUrls: ['create-provider.modal.scss']
})

export class CreateProviderModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    private _latitude = '55.751244';
    private _longitude = '37.618423';
    private _map;
    private _marker;
    public providerForm: FormGroup;
    public loading = false;
    public message: string;
    public providerDetails: IProvider;
    private _datePipe: DatePipe;
    public type: IProvidersType[] = [
        { name: 'Barber shop', value: 'B' },
        { name: 'Beauty salon', value: 'S' },
        { name: 'Individual', value: 'I' },

    ];
    public region: IRegion[] = [];
    @Input() providerId?: number;

    constructor(private _fb: FormBuilder, private _providersService: ProvidersService, private _dialogRef: NzModalRef) { }

    ngOnInit(): void {
        this._forBuilder();
        this._getRegion();
        this._initMap();
        if (this.providerId) {
            this._getProviderById();
        }
    }


    private _forBuilder(): void {
        this.providerForm = this._fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            region: ['', Validators.required],
            open_time: ['', Validators.required],
            close_time: ['', Validators.required]
        });
    }


    private _initMap(): void {
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

    private _getRegion(): void {
        this._providersService.getRegion()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((data: IRegion[]) => {
                this.region = data;
            });
    }

    private _getProviderById(): void {
        this.loading = true;
        this._providersService.getProviderById(this.providerId)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data: IProvider) => {
                this.providerDetails = data;
                if (this.providerDetails) {
                    this._setPatchValue();
                }
            },
                err => {
                    this.message = err.error;
                }
            );
    }

    private _setPatchValue(): void {
        const type = this.type.find((e) => e.value === this.providerDetails.type);
        const region: any = this.providerDetails.region;
        const regionValue = this.region.find((e) => e.name === region.name);
        this.providerForm.patchValue({
            name: this.providerDetails.name,
            open_time: this.providerDetails.open_time,
            close_time: this.providerDetails.close_time,
            type: type || null,
            region: regionValue || null,
        });
    }

    public submitForm(): void {
        for (const i in this.providerForm.controls) {
            this.providerForm.controls[i].markAsDirty();
            this.providerForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickCreateProvider(): void {
        this.loading = true;
        const {
            name,
        } = this.providerForm.value;
        const providerDetails: IProvider = {
            name,
            type: this.providerForm.value.type.value,
            region: this.providerForm.value.region.id,
            latitude: this._latitude,
            longitude: this._longitude,
            open_time: this.providerForm.value.open_time,
            close_time: this.providerForm.value.close_time,
        };
        this._providersService.createProvider(providerDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._dialogRef.destroy('provider Create');
            },
                err => {
                    this.message = err.message;
                    console.log(err);
                }
            );
    }

    public onClickPutchProvider(): void {
        this.loading = true;
        const {
            name,
        } = this.providerForm.value;
        const providerDetails: IProvider = {
            name,
            type: this.providerForm.value.type.value,
            region: this.providerForm.value.region.id,
            latitude: this._latitude,
            longitude: this._longitude,
            open_time: this.providerForm.value.open_time,
            close_time: this.providerForm.value.close_time,
        };
        this._providersService.putchProviderById(this.providerId, providerDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._dialogRef.destroy('provider Changed');
            },
                err => {
                    this.message = err.message;
                    console.log(err);

                }
            );
    }


    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}


