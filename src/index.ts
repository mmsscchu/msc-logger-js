import Logger from "./logger";
export default class MscLoggerJs{
    static getLogger(loggerName : string, options : object){
        return new Logger(loggerName, options);
    }
}