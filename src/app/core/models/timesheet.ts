export interface ITimesheet {
    amount: null;
    client: null;
    created: string;
    employee: number;
    end_datetime: string;
    hidden: boolean;
    id: string;
    items: ITemDetails;
    paid: boolean;
    payment_method: null;
    reserved: boolean;
    service_provider: number;
    start_datetime: string;
    updated: string;
}

export interface ITemDetails {
    employee_service: IEmployeeService;
    id: number;
    price: string;

}

export interface IEmployeeService {
    id: number,
    name: string;
    price: string;
    duration_in_minutes: number;
}