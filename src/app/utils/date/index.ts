import moment from "moment";

export function TRANSFORM_STRING_DATE_TO_FORMAT(
    date: string,
    format: string
): string {
    return moment(date).format(format);
}
