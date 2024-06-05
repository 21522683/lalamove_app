export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const validatePhone = (value) => {
    return value.match(/\d/g).length === 10;
};
export const validateCCCD = (value) => {
    return value.match(/\d/g).length === 12;
};
export function numbersOnly(e) {
    return /^\d+$/.test(e.toString()) ? true : false
}
