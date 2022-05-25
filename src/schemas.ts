export const invoiceSchema: DocumentSchema = {
    columns: [
        {
            label: 'Invoice Code',
            id: 'code',
            validations:[
                {
                    type: 'required',
                    message: 'required'
                }
            ]
        },
        {
            label: 'Issued Date',
            id: 'issuedDate',
            validations: []
        },
        {
            label: 'Owner Name',
            id: 'ownerName',
            validations: [
                {
                    type: 'required',
                    message: 'required'
                }
            ]
        },
        {
            label: 'Contact Name',
            id: 'contactName',
            validations: []
        },
        {
            label: 'Subtotal',
            id: 'subtotal',
            validations: []
        },
        {
            label: 'Taxes',
            id: 'taxes',
            validations: []
        },
        {
            label: 'Total',
            id: 'total',
            validations: [
                {
                    type: 'number',
                    message: 'invalid'
                }
            ]
        },
        {
            label: 'Status',
            id: 'status',
            validations: [
                {
                    type: 'regex',
                    regex: /^(draft|issued)$/,
                    message: 'invalid'
                }
            ]
        }        
    ]
}

export interface DocumentSchema {
    columns: {
        label: string;
        id: string;
        validations: Validation[];
    }[];
}


interface Validation {
    type: string;
    message: string;
    regex?: RegExp;
}

