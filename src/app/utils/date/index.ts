import moment from "moment";

export function TRANSFORM_STRING_DATE_TO_FORMAT(
    date: string,
    format: string
): string {
    return moment(date).format(format);
}

export function CALC_DAYS_AGO(day: number): [string, string] {
    const today = new Date();
    const priorDate = new Date();
    priorDate.setDate(today.getDate() - day);

    const start = new Date(
        priorDate.getFullYear(),
        priorDate.getMonth(),
        priorDate.getDate()
    );
    const end = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
}
