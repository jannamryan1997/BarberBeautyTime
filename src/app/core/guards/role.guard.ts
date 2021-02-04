import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


import { Observable } from 'rxjs';
import { TUserRole } from '../models/auth-user';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const enabledRoles = (route.data?.enabledRoles || []) as TUserRole[];
        const userRole = this._userService.getUserSync()?.role;

        const isEnabledRole = enabledRoles.includes(userRole);

        if (!isEnabledRole) {
            this._router.navigate(['/auth/login']);
        }

        return isEnabledRole;
    }
}
