
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
import { Icordination } from 'src/app/core/models/cordination';

declare const google;

@Component({
    selector: 'app-create-provider',
    templateUrl: 'create-provider.modal.html',
    styleUrls: ['create-provider.modal.scss']
})

export class CreateProviderModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    private _lat: number;
    private _lng: number;
    private _marker;
    private _map;
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
        const mapElement = document.getElementById('map');
        this._map = new google.maps.Map(mapElement, {
            center: { lat: 40.19047994699609, lng: 44.51557200000002 },
            zoom: 8,
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            });
        }
        this._marker = new google.maps.Marker({
            position: mapElement,
            map: this._map,
            title: 'Hello World!'
        });
        google.maps.event.addListener(this._map, 'click', (event: any) => {
            this._lat = event.latLng.lat();
            this._lng = event.latLng.lng();
            this._marker.setPosition(event.latLng);
        });

    }



    private _setMarker(coordinates: Icordination): void {
        const marker = new google.maps.Marker({
          position: coordinates,
          map: this._map,
        });
        //  this._marker.push(marker);
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
                    this._setMarker({ lat: +this.providerDetails.latitude, lng: +this.providerDetails.longitude });
                }
            },
                err => {
                    this.message = err.message;
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

    public onClickCreateProvider(): void {
        const lat = Number(this._lat.toFixed(2));
        const lng = Number(this._lng.toFixed(2));
        this.loading = true;
        const {
            name,
        } = this.providerForm.value;
        const providerDetails: IProvider = {
            name,
            type: this.providerForm.value.type.value,
            region: this.providerForm.value.region.id,
            latitude: String(lat),
            longitude: String(lng),
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
        const lat = Number(this._lat.toFixed(2));
        const lng = Number(this._lng.toFixed(2));
        this.loading = true;
        const {
            name,
        } = this.providerForm.value;
        const providerDetails: IProvider = {
            name,
            type: this.providerForm.value.type.value,
            region: this.providerForm.value.region.id,
            latitude: String(lat),
            longitude: String(lng),
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

                }
            );
    }

    public submitForm(): void {
        for (const i in this.providerForm.controls) {
            this.providerForm.controls[i].markAsDirty();
            this.providerForm.controls[i].updateValueAndValidity();
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}


