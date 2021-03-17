import { TUserRole } from './auth-user';

export interface IMenu {
    label: string;
    path?: string;
    roles: TUserRole[];
    icon: string;
    children?: IChildren[];
}

export interface IChildren {
    label: string;
    path?: string;
    roles: TUserRole[];
    icon: string;
}
