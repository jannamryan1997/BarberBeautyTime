
import { EUserRole } from '../models/auth-user';
import { IMenu } from '../models/menu';


export const MENU_ITEMS: IMenu[] = [
    { label: 'Providers', path: 'providers', icon: 'file-protect', roles: [EUserRole.Owner] },
    { label: 'Profile', path: 'profile', icon: 'user', roles: [EUserRole.Employee] },
    { label: 'Services', path: 'services', icon: 'scissor', roles: [EUserRole.Employee] },
    { label: 'Timesheet', path: `timesheet/:serviceProviderId/:id`, icon: 'field-time', roles: [EUserRole.Employee] },
];

