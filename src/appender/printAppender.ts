import DefaultAppender from "./appender";
import {LogLevel} from "../logLevels";
import {PrintAppenderOption} from "../logOptions";

export default class PrintAppender extends DefaultAppender{
    constructor(loggerName : string, appenderOption : PrintAppenderOption) {
        super(loggerName, appenderOption);
    }

    print(logLevel: LogLevel, message: string, ...args: any[]): void{
        let loggerName = this._loggerName;
        let dateString : string = this._dateTime.formatString()
        let stackString : string = this._stack.getStackData();
        let logMessage : string = `[${dateString}][${logLevel.text}][${loggerName}] ${message}\n${stackString}`

        if(this._appenderOption.color){
            console.log(`%c${logMessage}`, `color:${logLevel.color}`);
        }else{
            console.log(logMessage)
        }
    }
}