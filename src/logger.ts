import moment from 'moment';

export default class Logger{
    private readonly loggerName : string
    private loggerOption : object;

    constructor(loggerName : string, loggerOption? : object) {
        this.loggerName = loggerName
        this.loggerOption = {} ?? Object.assign({}, loggerOption)
    }
    getLoggerName(){
        return this.loggerName
    }
    private print(option: LogLevel, message: string, ...args: any[]){

        let dateString : string = moment().format('YYYY-MM-DD hh:mm:ss');
        let logMessage : string = `[${dateString}][${option.text}] ${message}`

        console.log(`%c${logMessage}`, `color:${option.color}`);
        console.debug(`%c${logMessage}`, `color:${option.color}`)
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
class LogLevel{
    text : string;
    color : string;
}
class LogLevels{
    public static LOG_LEVEL_DEBUG : LogLevel = {
        text : 'DEBUG',
        color : '#915CEF'
    }
    public static LOG_LEVEL_TRACE : LogLevel = {
        text : 'TRACE',
        color : '#36A4FF'
    }
    public static LOG_LEVEL_INFO : LogLevel = {
        text : 'INFO',
        color : '#00CC88'
    }
    public static LOG_LEVEL_WARN : LogLevel = {
        text : 'WARN',
        color : '#FF7D4A'
    }
    public static LOG_LEVEL_ERROR : LogLevel = {
        text : 'ERROR',
        color : '#FF454D'
    }
}