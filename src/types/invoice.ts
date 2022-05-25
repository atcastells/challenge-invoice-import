export interface Invoice {
    code: string;
    issuedDate: string;
    ownerName: string;
    contactName: string;
    subtotal: number;
    taxes: number;
    total: number;
    status: string;
}

export enum InvoiceHeaders {
    InvoiceCode,
    IssuedDate,
    OwnerName,
    ContactName,
    Subtotal,
    Taxes,
    Total,
    Status,
}