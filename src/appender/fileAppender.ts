import DefaultAppender from "./appender";
import {LogLevel} from "../logLevels";
import {FileAppenderOption} from "../logOptions";

export default class FileAppender extends DefaultAppender{
    constructor(loggerName : string, appenderOption : FileAppenderOption) {
        super(loggerName, appenderOption);
    }

    print(logLevel: LogLevel, message: string, ...args: any[]): void {
        let loggerName = this._loggerName;
        let dateString : string = this._dateTime.now()
        let stackString : string = this._stack.getStackData();
        let logMessage : string = `[${dateString}][${logLevel.text}][${loggerName}] ${message}\n${stackString}`

        if(this._appenderOption.color){
            console.log(`%c${logMessage}`, `color:${logLevel.color}`);
        }else{
            console.log(logMessage)
        }
    }
}