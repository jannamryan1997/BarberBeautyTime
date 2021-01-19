import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { of, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModal } from 'src/app/core/modals';
import { IEmployees } from 'src/app/core/models/employees';
import { ProvidersService } from '../../providers.service';

@Component({
    selector: 'app-create-employe',
    templateUrl: 'create-employe.modal.html',
    styleUrls: ['create-employe.modal.scss']
})

export class CreateEmployemodalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public employeDetails: IEmployees;
    public employeForm: FormGroup;
    public serivceImage;
    public fallback = '/assets/images/local.png';
    public message: string;
    public loading = false;
    @Input() providerId: number;
    @Input() employeId: number;

    constructor(private _providersService: ProvidersService, private _fb: FormBuilder, private _modal: NzModalRef, private _nzModal: NzModalService) { }

    ngOnInit() {
        this._forBuilder();
        this._getEmployeById();

    }

    private _forBuilder(): void {
        this.employeForm = this._fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            rating: ['']
        })
    }

    private _setPatchValue(): void {
        this.employeForm.patchValue({
            first_name: this.employeDetails.user.first_name,
            last_name: this.employeDetails.user.last_name,
            rating: this.employeDetails.rating,
        })
    }

    private _getEmployeById(): void {
        this._providersService.getEmployeById(this.providerId, this.employeId)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((data: IEmployees) => {
                this.employeDetails = data;
                this._setPatchValue();

            })
    }

    public submitForm(): void {
        for (const i in this.employeForm.controls) {
            this.employeForm.controls[i].markAsDirty();
            this.employeForm.controls[i].updateValueAndValidity();
        }
    }

    public onChangeFile(event) {
        if (event) {
            let reader = new FileReader()
            this.serivceImage = event;

            let self = this;
            reader.onload = function (e: any) {
                self.fallback = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    private _updateFile(event) {
        if (event) {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                let formData: FormData = new FormData();
                formData.append('image', file, file.name);
                return this._providersService.uploadFile(formData)

            }
            else {
                return of([]);
            }
        }

    }

    ////forkJoin-ov updet client kenenq ham update user image hamel tvjalneri funkcian



    public patchEmploye(): void {
        this.loading = true;
        const {
            first_name,
            last_name,
            rating,
        } = this.employeForm.value;
        const employDetels: IEmployees = {
            id: this.employeDetails.id,
            service_provider: this.employeDetails.service_provider,
            rating,
            user: {
                first_name: first_name,
                id: this.employeDetails.user.id,
                last_name: last_name,
                avatar: this.fallback,
            }
        }
        this._providersService.putchEmploye(this.providerId, this.employeId, employDetels)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data) => {
                console.log(data);

            },
                err => {
                    this.message = err.message;

                }
            )
    }

    private _deteEmploye():void{
        this._providersService.deleteEmploye(this.providerId, this.employeId)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((data) => {
            this._modal.destroy('deletedEmploye');
            console.log(data);

        })
    }

    public onClickDeleteEmploye(): void {

        const dialogRef = this._nzModal.create({
            nzContent: ConfirmDeleteModal
        })
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'delete') {;
                this._deteEmploye();
            }
            else {
                this._modal.destroy();
            }
        })

    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}