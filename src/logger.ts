import DateTime from "./datetime";
import Stack from './stack';
import {LogOptions, LogAppenderOption, ConsoleAppenderOption} from "./logOptions";
import {LogLevel, LogLevels} from "./logLevels";
import ConsoleAppender from "./appender/consoleAppender";
import FileAppender from "./appender/fileAppender";
import PrintAppender from "./appender/printAppender";

export default class Logger{
    private loggerName : string
    private loggerOption : LogOptions;
    private loggerAppenderOption : LogAppenderOption

    private appender : {
        file?: FileAppender
        console? : ConsoleAppender
        print? : PrintAppender
    } = {}

    private dateTime: DateTime;
    private stack: Stack;

    constructor(loggerName : string, loggerOption? : LogOptions) {
        this.loggerName = loggerName
        this.loggerOption = loggerOption
        this.loggerAppenderOption = loggerOption.appender

        if(this.loggerAppenderOption.console){
            this.appender.console = new ConsoleAppender(this.loggerName, this.loggerAppenderOption.console);
        }
        if(this.loggerAppenderOption.file){
            this.appender.file = new FileAppender(this.loggerName, this.loggerAppenderOption.file);
        }
        if(this.loggerAppenderOption.print){
            this.appender.print = new PrintAppender(this.loggerName, this.loggerAppenderOption.print);
        }
        this.dateTime = new DateTime();
        this.stack = new Stack();
    }
    getName(){
        return this.loggerName
    }
    private appenderPrint(logLevel: LogLevel, message: string, ...args: any[]){
        for(let appenderName in this.appender){
            this.appender[appenderName].print.apply(null, [logLevel, message, ...args]);
        }
    }
    debug(message: string, ...args: any[]){
        this.appenderPrint(LogLevels.LOG_LEVEL_DEBUG, message, args);
    }
    trace(message: string, ...args: any[]){
        this.appenderPrint(LogLevels.LOG_LEVEL_TRACE, message, args);
    }
    info(message: string, ...args: any[]){
        this.appenderPrint(LogLevels.LOG_LEVEL_INFO, message, args);
    }
    warn(message: string, ...args: any[]){
        this.appenderPrint(LogLevels.LOG_LEVEL_WARN, message, args);
    }
    error(message: string, ...args: any[]){
        this.appenderPrint(LogLevels.LOG_LEVEL_ERROR, message, args);
    }
}