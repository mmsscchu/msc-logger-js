import Logger from "./logger";
import LoggerManager from "./loggerManager";
import {LogOptions} from "./logOptions";

export default class MscLoggerJs{
    private static _defaultOptions: LogOptions = {
        level : 'INFO',
        color : false,
        appender : {}
    }
    private static _loggerManager = new LoggerManager();

    static getLogger(loggerName? : string, options? : LogOptions){
        options = Object.assign(this._defaultOptions, options);
        return this._loggerManager.getLogger(loggerName, options)
    }
    static setOptions(options: object){
        this._defaultOptions = Object.assign(this._defaultOptions, options);
    }
}