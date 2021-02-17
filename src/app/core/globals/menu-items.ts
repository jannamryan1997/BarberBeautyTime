import { EUserRole } from '../models/auth-user';
import { IMenu } from '../models/menu';

export const MENU_ITEMS: IMenu[] = [
    { label: 'Providers', path: 'providers', roles: [EUserRole.Owner] },
    { label: 'Profile', path: 'profile', roles: [EUserRole.Employee] },
    { label: 'Services', path: 'services', roles: [EUserRole.Employee] },
    // {
    //     label: 'Settings', path: '#', roles: [EUserRole.Employee, EUserRole.Owner],
    //     children:
    //      [{ label: 'Changed Password', path: 'changed-password', roles: [EUserRole.Owner, EUserRole.Employee] }]
    // }

];
