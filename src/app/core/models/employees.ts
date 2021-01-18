export interface IEmployees {
    id: number;
    rating: number;
    service_provider: number;
    user: IEmployeesUser;
}

export interface IEmployeesUser {
    avatar: string;
    first_name: string;
    id: number;
    last_name: string;
}