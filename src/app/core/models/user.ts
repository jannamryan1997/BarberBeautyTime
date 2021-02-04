export interface IUser {
    access_token: string;
    refresh_token: string;
    user: IUserDetais;
}

export interface IUserDetais {
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    pk: number;
    role: string;
    username: string;
    additional_data: IAdditional;
}

export interface IAdditional{
    owner?: IOwner;
    employee?: IEmployee;
}
export interface IOwner {
    approved: boolean;
    id: string;
}

export interface IEmployee {
    id: number;
    service_provider_id: string;
}

