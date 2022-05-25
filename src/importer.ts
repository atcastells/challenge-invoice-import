import { FILESFOLDER, INVOICE_SEPARATOR, VALIDATIONOK } from './constants';
import { invoiceSchema } from './schemas';
import { Invoice, InvoiceHeaders } from './types/invoice';
import { cleanString, parseNumber } from './utils';
import { validateDocument } from './validator';

const fs = require('fs/promises');
export class Importer {
  async import(filePath: string): Promise<any> {
    try {
      
      const file: string = await fs.readFile(`./${FILESFOLDER}/${filePath}`, 'utf8');        
      const lines = file.split('\n');
      const data = lines.slice(1);
      const schema = invoiceSchema;
      let errors: ImporterErrorOutput[] = [];
      let validData: Invoice[] = [];
      data.forEach((line, i) => {
        const values = line.split(INVOICE_SEPARATOR);
        if(values.length === schema.columns.length) {
          const validationResult = validateDocument(values, schema);
          const validationWithErrors = validationResult.filter((result) => result.message !== VALIDATIONOK);
          if(validationWithErrors.length > 0) {
            validationWithErrors.forEach((result) => {
              const error: ImporterErrorOutput = {
                line: i+1,
                errors: [
                  {
                    property: result.property,
                    message: result.message,
                  },
                ],
              };

              errors.push(error);
            })
          } else {            
            const invoice: Invoice = {
              code: cleanString(values[InvoiceHeaders.InvoiceCode]),
              issuedDate: cleanString(values[InvoiceHeaders.IssuedDate]),
              ownerName: cleanString(values[InvoiceHeaders.OwnerName]),
              contactName: cleanString(values[InvoiceHeaders.ContactName]),
              subtotal: parseNumber(values[InvoiceHeaders.Subtotal]),
              taxes: parseNumber(values[InvoiceHeaders.Taxes]),
              total: parseNumber(values[InvoiceHeaders.Total]),
              status: cleanString(values[InvoiceHeaders.Status]),
            };
            validData.push(invoice);
          }
        }        
      })

      return {
        ok: validData,
        ko: errors,
      };
      
    } catch (error) {
      console.error(error);
    }        
  }
}

interface ImporterErrorOutput {
  line: number;
  errors: {
    property: string;
    message: string;
  } [];
}