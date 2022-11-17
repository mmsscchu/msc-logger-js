import DefaultAppender from "./appender";
import {LogLevel} from "../logLevels";
import {FileAppenderOption} from "../logOptions";
import ConstanceInfo from "../common/constantInfo";

export default class FileAppender extends DefaultAppender{
    private fileLoggerName: string
    private lastedDate: any
    private storage:Storage;

    constructor(loggerName : string, appenderOption : FileAppenderOption) {
        super(loggerName, appenderOption);

        this.storage = window.localStorage;
        this.lastedDate = this._dateTime.dateToObject(new Date());
        this.fileLoggerName = this.createFileLoggerName();

        if(!this.storage){
            throw new Error('Not available in your browser :' + navigator.userAgent);
        }
        this.dateCheckInterval()
    }
    private createFileLoggerName(){
       return `${ConstanceInfo.NAME}_${this._loggerName}_${this._dateTime.yyyyMMdd()}`;
    }
    private dateCheckInterval(){
        const INTERVAL_GAP = 1000 * 60

        function dateChecker(){ /* 시간기준으로 인터벌 생성 */
            let intervalGap;
            let currentDateTime = this._dateTime.dateToObject(new Date())

            if(currentDateTime.hours < 23){
                intervalGap = 1000 * 60 * 60;
            }else if(currentDateTime.min < 58){
                intervalGap = 1000 * 60;
            }else{
                intervalGap = 1000;
            }
            setTimeout(()=>{
                dateChecker()
            }, intervalGap)
        }

        let interval = setInterval(()=>{

            if(
                this.lastedDate.year !== currentDateTime.year ||
                this.lastedDate.month !== currentDateTime.month ||
                this.lastedDate.date !== currentDateTime.date
            ){
                this.fileLoggerName = this.createFileLoggerName();
            }
        }, INTERVAL_GAP)
    }
    private write(message){
        let data = this.storage.getItem(this.fileLoggerName);
        this.storage.setItem(this.fileLoggerName, `${data ? data : ''}\r\n${message}`)
    }
    print(logLevel: LogLevel, message: string, ...args: any[]): void {
        let loggerName = this._loggerName;
        let dateString : string = this._dateTime.formatString()
        let stackString : string = this._stack.getStackData();
        let logMessage : string = `[${dateString}][${logLevel.text}][${loggerName}] ${message}\n${stackString}`

        this.write(logMessage)
        /*if(this._appenderOption.color){
            console.log(`%c${logMessage}`, `color:${logLevel.color}`);
        }else{
            console.log(logMessage)
        }*/
    }
}