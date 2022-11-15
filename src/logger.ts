import DateTime from "./datetime";
import Stack from './stack';
import LogOptions from "./logOptions";
import {LogLevel, LogLevels} from "./logLevels";

export default class Logger{
    private loggerName : string
    private loggerOption : LogOptions;
    private arrayPrepareStackTrace: any;

    private dateTime: DateTime;
    private stack: Stack;

    constructor(loggerName : string, loggerOption? : LogOptions) {
        this.loggerName = loggerName
        this.loggerOption = loggerOption
        this.arrayPrepareStackTrace = (err, stack) => { return stack }

        this.dateTime = new DateTime();
        this.stack = new Stack();
    }
    getName(){
        return this.loggerName
    }
    private print(logLevel: LogLevel, message: string, ...args: any[]){
        let loggerName = this.loggerName;
        let dateString : string = this.dateTime.now()
        let stackString : string = this.stack.getStackData();
        let logMessage : string = `[${dateString}][${logLevel.text}][${loggerName}] ${message}\n${stackString}`

        if(this.loggerOption.color){
            console.log(`%c${logMessage}`, `color:${logLevel.color}`);
        }else{
            console.log(logMessage)
        }


       /* const priorPrepareStackTrace = Error.prepareStackTrace
        Error.prepareStackTrace = this.arrayPrepareStackTrace
        const stack:any = (new Error()).stack
        Error.prepareStackTrace = priorPrepareStackTrace
        console.log(stack)
        console.dir(stack);

        console.log(stack[0].getFunctionName())
        console.log(stack[0].getFileName())
        console.log(stack[0].getLineNumber())
        console.log(new Error().stack.split("\n"));

        console.log(stack[1].getFunctionName())
        console.log(stack[1].getFileName())
        console.log(stack[1].getLineNumber())*/
    }
    debug(message: string, ...args: any[]){
        this.print(LogLevels.LOG_LEVEL_DEBUG, message, args);
    }
    trace(message: string, ...args: any[]){
        this.print(LogLevels.LOG_LEVEL_TRACE, message, args);
    }
    info(message: string, ...args: any[]){
        this.print(LogLevels.LOG_LEVEL_INFO, message, args);
    }
    warn(message: string, ...args: any[]){
        this.print(LogLevels.LOG_LEVEL_WARN, message, args);
    }
    error(message: string, ...args: any[]){
        this.print(LogLevels.LOG_LEVEL_ERROR, message, args);
    }
}