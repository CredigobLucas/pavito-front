export const CLEAN_NULL_VALUES = (obj: any): any => {
    Object.keys(obj).forEach(
        (key) => (obj[key] == null || obj[key] === "") && delete obj[key]
    );
    return obj;
};
