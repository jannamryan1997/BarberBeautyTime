import { EUserRole } from "../models/auth-user";
import { IMenu } from "../models/menu";

export const MENU_ITEMS: IMenu[] = [
    { label: 'Home', path: 'home', roles: [EUserRole.Admin, EUserRole.Client, EUserRole.Employee,EUserRole.Owner] },
    // { label: 'My orders', path: '#', roles: [EUserRole.Admin, EUserRole.Client, EUserRole.Owner, EUserRole.Employee] },
    { label: 'Providers', path: 'providers', roles: [EUserRole.Admin, EUserRole.Client, EUserRole.Owner, EUserRole.Employee] },
    {label:'Timesheet',path:'timesheet',roles:[EUserRole.Owner,EUserRole.Employee]},
    { label: 'Changed Password', path: 'changed-password', roles: [EUserRole.Admin, EUserRole.Client, EUserRole.Owner, EUserRole.Employee] },
  

];