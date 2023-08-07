export interface IObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const CLEAN_NULL_VALUES = (obj: IObject): IObject => {
    Object.keys(obj).forEach(
        (key) => (obj[key] === null || obj[key] === "") && delete obj[key]
    );
    return obj;
};
