export interface IEmployees {
    id: number;
    rating?: number;
    service_provider: number;
    user: IEmployeesUser;
}

export interface IEmployeesUser {
    avatar?: string;
    first_name: string;
    id: number;
    last_name: string;
}

export interface EmployeData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    service_provider: number;
}