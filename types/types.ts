
export enum UserRole {
    Admin = 'Admin',
    Operator = 'Operator',
}

export enum EmployeeType {
    Autonomous = 'Autônomo',
    Training = 'Treinamento',
}

export enum Status {
    Active = 'Ativo',
    Inactive = 'Inativo',
}

export enum DailyRateStatus {
    Pending = 'Pendente',
    Paid = 'Pago',
    Canceled = 'Cancelado',
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: Status;
}

export interface Company {
    id: number;
    name: string;
    cnpj: string;
    contact: string;
    phone: string;
    status: Status;
}

export interface Client {
    id: number;
    name: string;
    companyId: number;
    companyName?: string;
    contact: string;
    status: Status;
}

export interface Employee {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    type: EmployeeType;
    status: Status;
}

export interface DailyRate {
    id: number;
    employeeId: number;
    employeeName?: string;
    clientId: number;
    clientName?: string;
    companyName?: string;
    date: string;
    value: number;
    status: DailyRateStatus;
}
