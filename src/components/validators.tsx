export const isNumValidator = (num:string):Boolean | null => {
    if ( num === '' ) return true 
    return (/^[0-9]+$/ ).test( (num) ) ? true : false 
}

interface IformFields {
    minimum: string, 
    maximum: string, 
    target: string
}

export const formFieldsValidator = (formFields: IformFields): boolean => {
    return formFields.minimum !== '' && formFields.maximum !== '' && formFields.target !== '' ? true : false 
}