import moment from "moment";
import { zero_code } from '../constants/constants';

export function isTimeBetween(before, after) {
    const datetime = moment();
    const datetime_format = 'YYYY-MM-DDTHH:mm:ssZ';
    const time_format = 'HH:mm:ss';

    let originalDatetime = moment(datetime, datetime_format);
    let transformed = moment({ hour: originalDatetime.hour(), minute: originalDatetime.minute(), second: originalDatetime.second() });

    var beforeTime = moment(before, time_format);
    var afterTime = moment(after, time_format);

    return transformed.isBetween(beforeTime, afterTime);
}

export function unifyMobileNumber(number) {
    if (number.startsWith(zero_code)) {
        number = number.slice(2)
        return `+${number}`
    }

    return number
}