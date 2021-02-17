import { IAdditional, IEmployee } from './user';

export interface IAuthUser {
    pk: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    avatar: string;
    role: EUserRole;
    additional_data: IAdditional;
}
export enum EUserRole {
    Admin = 'A',
    Owner = 'O',
    Employee = 'E',
    Client = 'C',
}

export type TUserRole = EUserRole.Admin | EUserRole.Owner | EUserRole.Employee | EUserRole.Client;
