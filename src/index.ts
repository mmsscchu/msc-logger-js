import Logger from "./logger";
import LoggerManager from "./loggerManager";
import LoggerOptions from "./logOptions";

export default class MscLoggerJs{
    private static _defaultOptions: LoggerOptions = {
        level : 'INFO',
        color : false
    }
    private static _loggerManager = new LoggerManager();

    static getLogger(loggerName? : string, options? : LoggerOptions){
        options = Object.assign(this._defaultOptions, options);
        return this._loggerManager.getLogger(loggerName, options)
    }
    static setOptions(options: object){
        this._defaultOptions = Object.assign(this._defaultOptions, options);
    }
}