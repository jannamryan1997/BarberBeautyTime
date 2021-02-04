import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IService } from 'src/app/core/models/service';
import { TimesheetService } from '../../timesheet.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'create-service',
    templateUrl: 'create-service.modal.html',
    styleUrls: ['create-service.modal.scss']
})

export class CreateServiceModalComponent implements OnInit, OnDestroy{

    private _unsubscribe$ = new Subject<void>();
    public message: string;
    public serviceForm: FormGroup;
    public loading = false;

    @Input() providerId: number;
    @Input() employId: number;

    constructor(
        private _fb: FormBuilder,
        private _timesheetService: TimesheetService,
        private _modal: NzModalRef, private _message: NzMessageService){}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void{
        this.serviceForm = this._fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            duration_in_minutes: ['', Validators.required]
        });
    }

  public  submitForm(): void {
        for (const i in this.serviceForm.controls) {
            this.serviceForm.controls[i].markAsDirty();
            this.serviceForm.controls[i].updateValueAndValidity();
        }
    }

    public onCreateService(): void{
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
       this._timesheetService.createService(serviceDetails,this.providerId,this.employId)
       .pipe(takeUntil(this._unsubscribe$),
       finalize(()=>{
           this.loading=false;
       })
       )
       .subscribe((data)=>{
           if(data){
               this._message.create('success', `This is a message of success`)
               this._modal.destroy();
           }
       },
       err =>{
           this.message = err.message;
       }
       )
        
    }

    ngOnDestroy(): void{
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
