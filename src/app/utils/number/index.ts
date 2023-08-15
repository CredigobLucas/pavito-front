export class CustomNumber extends Number {
    format(locale?: string | undefined, options?: Intl.NumberFormatOptions | undefined): string {        
        return super.toLocaleString(locale ? locale : 'en-US', options ? options : {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    }
}