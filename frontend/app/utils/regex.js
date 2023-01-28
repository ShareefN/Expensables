export const emailVaidation = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    return regex.test(email);
}

export const passwordValidation = (password) => {
    let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    // return regex.test(password);
    return password.length >= 8;
}

export const plateNumberValidation = (number) => {
    let regex = new RegExp(/^[0-9]+$/);

    return regex.test(number);
}

export const numbers = (text) => {
    let regex = new RegExp(/^\d+$/)

    return regex.test(text);
}