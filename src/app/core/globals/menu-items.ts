import { EUserRole } from '../models/auth-user';
import { IMenu } from '../models/menu';

export const MENU_ITEMS: IMenu[] = [
    { label: 'Providers', path: 'providers', roles: [EUserRole.Owner] },
    { label: 'User', path: 'user', roles: [EUserRole.Employee] },
    { label: 'Changed Password', path: 'changed-password', roles: [EUserRole.Owner, EUserRole.Employee] },
];
