import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeProfileService } from './employee-profile.service';
import { IAuthUser } from 'src/app/core/models/auth-user';
import { finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { MenuService } from 'src/app/core/services/menu.service';
import { EmployeData } from 'src/app/core/models/employees';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFileResponse } from 'src/app/core/models/upload-file';

@Component({
    selector: 'app-employee-profile',
    templateUrl: 'employee-profile.view.html',
    styleUrls: ['employee-profile.view.scss']
})

export class EmployeeProfileViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm: FormGroup;
    public user: IAuthUser;
    public localImage: any = 'assets/images/hairdresser.jpg';
    public loading = false;
    public message: string;
    public service_provider_id: string;

    constructor(
        private _fb: FormBuilder,
        private _employeeProfileService: EmployeeProfileService,
        private _router: Router,
        private _cookieService: CookieService,
        private _menuService: MenuService,
        private _message: NzMessageService,
    ) {
        let service_provider_id = this._cookieService.get('service_provider_id');
        if (service_provider_id) {
            this.service_provider_id = service_provider_id;
        }
        this._menuService.setPageTitle('Profile');
    }

    ngOnInit(): void {
        this._initForm();
        this._getEmployee();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required]
        });
    }

    private _setPatchValue(): void {
        this.validateForm.patchValue({
            username: this.user.username,
            email: this.user.email,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
        });
    }

    private _getEmployee(): void {
        this.loading = true;
        this._employeeProfileService.getEmployee()
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this.user = data;
                if (this.user.avatar) {
                    this.localImage = this.user.avatar;
                }
                this._setPatchValue();

            },
                err => {
                    this.message = err.message;
                }
            );
    }

    private _setFormDataImage(image): void {
        if (image && image.target) {
            const formData = new FormData();
            const fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                const file: File = fileList[0];
                formData.append('avatar', file, file.name);

                this._employeeProfileService.uploatEmployeeProfileImage(formData)
                    .subscribe((data: UploadFileResponse) => {
                         this.localImage = data.url;
                         this._getEmployee();
                    });
            }
        }
    }

    public handleFileSelect(evt): void {
        const files = evt.target.files;
        const file = files[0];
        if (files && file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64str = reader.result;
                this.localImage = base64str;
            };
            reader.readAsDataURL(file);
        }
        this._setFormDataImage(evt);
    }

    public onClickChangeEmployeeProfileData(): void {
        this.loading = true;
        const {
            username,
            email,
            first_name,
            last_name,
        } = this.validateForm.value;
        const employeProfileDetai: EmployeData = {
            username,
            email,
            first_name,
            last_name,
        };
        this._employeeProfileService.changeEmployeeProfile(employeProfileDetai)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._message.create('success', `This is a message of success`);
                this._getEmployee();
            },
                err => {
                    this.message = err.message;
                }
            );
    }


    public onClickBooking(): void {
        this._router.navigate([`timesheet/${this.service_provider_id}/${this.user.additional_data.employee.id}`]);
    }

    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
