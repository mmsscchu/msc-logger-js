import {LogLevel} from "../logLevels";
import DateTime from "../datetime";
import Stack from "../stack";
import {AppenderOption} from "../logOptions";

export default abstract class DefaultAppender{
    _loggerName : string
    _appenderOption : AppenderOption;

    _dateTime: DateTime;
    _stack: Stack;

    protected constructor(loggerName : string, appenderOption? : AppenderOption) {
        this._loggerName = loggerName
        this._appenderOption = appenderOption

        this._dateTime = new DateTime();
        this._stack = new Stack();
    }

    abstract print(logLevel: LogLevel, message: string, ...args: any[]) :void
}