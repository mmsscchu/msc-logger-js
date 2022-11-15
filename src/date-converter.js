class DateConverter {
    constructor() {

    }
    dateToString(dateObject, format){
        let year = dateObject.getFullYear();
        let month = dateObject.getMonth() + 1;
        let date = dateObject.getDate();
        let hours = dateObject.getHours();
        let min = dateObject.getMinutes();
        let sec = dateObject.getSeconds();
        let msc = dateObject.getMilliseconds();

        format = format.replace('yyyy', year);
        format = format.replace('MM', month);
        format = format.replace('dd', date);
        format = format.replace('HH', hours);
        format = format.replace('mm', min);
        format = format.replace('ss', sec);
        format = format.replace('sss', msc);

        return format;
    }
}
const dateConverter = new DateConverter();
export default dateConverter;