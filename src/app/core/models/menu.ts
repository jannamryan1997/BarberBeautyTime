import { TUserRole } from "./auth-user";

export interface IMenu {
    label: string;
    path: string;
    roles: TUserRole[];
}