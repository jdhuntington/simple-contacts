export interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    company: string;
}

export interface ApplicationState {
    contacts: Contact[];
}