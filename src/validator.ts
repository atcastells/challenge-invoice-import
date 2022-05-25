import { VALIDATIONOK } from './constants';
import { DocumentSchema } from './schemas';
import { cleanString } from './utils';

const requiredValidation = (value: string): boolean => {
    return value !== '' && value !== undefined && value !== null;
}

const regexValidation = (value: string, regex: RegExp): boolean => {    
    return regex.test(value);
}

const numberValidation = (value: string): boolean => {
    return !isNaN(Number(value));
}




export const validateDocument = (parsedLine: string[], documentSchema: DocumentSchema): ValidationResult[] => {
    const validationResult: ValidationResult[] = [];

    parsedLine.forEach((field, i) => {
        const cleanField = cleanString(field);
        const validations = documentSchema.columns[i].validations;
        const property = documentSchema.columns[i].id;
        validations.forEach((validation) => {
            let valid = true;
            let message = VALIDATIONOK;
            switch (validation.type) {
                case 'required':
                    valid = requiredValidation(cleanField);
                    if(!valid) {
                        message = validation.message;
                    }
                    break;
                case 'regex':                    
                    if(validation.regex) {
                        valid = regexValidation(cleanField, validation.regex);
                        if(!valid) {
                            message = validation.message;
                        }
                    } else {
                        valid = false;
                    }  
                    break;
                case 'number':
                    valid = numberValidation(cleanField);
                    if(!valid) {
                        message = validation.message;
                    }
                    break;
            }

            if(!valid) {
                validationResult.push({                    
                    property,
                    message,
                });
            } else {
                validationResult.push({
                    property,
                    message: VALIDATIONOK,
                });
            }
        })
    })

    return validationResult;

}

interface ValidationResult {
    property: string;
    message: string;
}
