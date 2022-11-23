import DateTime from "../datetime";
import Stack from "../stack";
import {AppenderOption} from "../logOptions";
import {LogLevel} from "../logLevels";

export default abstract class DefaultAppender {
    public _loggerName: string = null;
    public _appenderOption: AppenderOption;

    public _dateTime: DateTime;
    public _stack: Stack;

    protected constructor(loggerName: string, appenderOption?: AppenderOption) {
        this._loggerName = loggerName
        this._appenderOption = appenderOption

        this._dateTime = new DateTime();
        this._stack = new Stack();
    }

    public abstract print(logLevel: LogLevel, message: string, ...args: any[]): void;
    public abstract destroy() : void;
}
