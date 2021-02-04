export interface IProvidersType {
    name: string;
    value: string;
}

export interface IProvider {
    avatar?: string;
    id?: number;
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    region: number | Region;
    owner?: IOwner;
    rating?: number;
}

export class IProviderDetails {
    count: number;
    next: number;
    previous: number;
    results: IProvider[];
}

export interface IOwner {
    approved: boolean;
    id: number;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    pk: number;
    role: string;
    username: string;
    additional_data: AdditionalOwner;
}

export interface AdditionalOwner {
    approved: boolean;
    id: number;
}

export interface Region {
    id: number;
    name: string;
}
