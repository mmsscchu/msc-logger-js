export default class DateTime {
    private format;

    constructor(format: string = 'yyyy-MM-dd HH:mm:ss.sss') {
        this.format = format
    }
    public setFormat(format: string){
        this.format = format
    }
    public getFormat(){
        return this.format
    }
    public now(){
        return this.dateToString(new Date())
    }
    private padding(value){
        return value < 10 ? '0' + value : '' + value
    }
    private dateToString(dateObject){
        let year = dateObject.getFullYear();
        let month = dateObject.getMonth() + 1;
        let date = dateObject.getDate();
        let hours = dateObject.getHours();
        let min = dateObject.getMinutes();
        let sec = dateObject.getSeconds();
        let msc = dateObject.getMilliseconds();

        let message = this.format;
        message = message.replace('yyyy', this.padding(year));
        message = message.replace('MM', this.padding(month));
        message = message.replace('dd', this.padding(date));
        message = message.replace('HH', this.padding(hours));
        message = message.replace('mm', this.padding(min));
        message = message.replace('ss', this.padding(sec));
        message = message.replace('sss', msc);

        return message;
    }
}