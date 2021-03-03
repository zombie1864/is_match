export const isNumValidator = (num:string):Boolean | null => {
    if ( num === '' ) return true 
    return (/^[0-9]+$/ ).test( (num) ) ? true : false 
}
