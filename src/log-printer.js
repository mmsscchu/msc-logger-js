import DateConveter from "./date-converter";
import LogViewer from "./log-viewer";
import LogLevel from "./log-level";

export default class LogPrinter {
    constructor(logName, options) {
        this.logViewer = new LogViewer();

        if(!logName){
            throw new Error('Logger name is required')
        }

        this.logLevel = options.level;
        this.logView = options.view;
        this.logWindow = options.window;
        this.logColor = options.color;

        this.windowErrorHandler = (e)=>{
            if(e && e.lineno && e.colno && e.message && e.filename){
                this.error('[{}:{}] {} : {}', e.lineno, e.colno, e.message, e.filename)
            }else{
                this.error('window error (no information to display)');
            }
        }

        this.setLevel(this.logLevel);
        this.setView(this.logView);
        this.setWindow(this.logWindow);
        this.setColor(this.logColor);

        this.logName = logName;
    }

    setLevel(level) {
        if(typeof level === 'string'){
            switch(level.toUpperCase()){
                case 'DEBUG':
                    this.logLevel = LogLevel.LOG_LEVEL_DEBUG
                    break;
                case 'TRACE':
                    this.logLevel = LogLevel.LOG_LEVEL_TRACE
                    break;
                case 'INFO':
                    this.logLevel = LogLevel.LOG_LEVEL_INFO
                    break;
                case 'WARN':
                    this.logLevel = LogLevel.LOG_LEVEL_WARN
                    break;
                case 'ERROR':
                    this.logLevel = LogLevel.LOG_LEVEL_ERROR
                    break;
            }
        }else if(typeof level === 'number'){
            this.logLevel = level
        }else{
            this.logLevel = LogLevel.LOG_LEVEL_INFO
        }
    }
    setView(showView){
        this.logViewer.setView(showView)
    }
    setWindow(showWindowError){
        if(showWindowError){
            window.addEventListener('error', this.windowErrorHandler);
        }else{
            window.removeEventListener('error', this.windowErrorHandler);
        }
    }
    setColor(isUsed){
        this.logColor = isUsed;
    }
    debug() {
        if (this.logLevel >= LogLevel.LOG_LEVEL_DEBUG) {
            let color = 'rgb(54, 156, 244)'
            this.print('DEBUG', arguments)
        }
    }

    trace() {
        if (this.logLevel >= LogLevel.LOG_LEVEL_TRACE) {
            this.print('TRACE', arguments)
        }
    }

    info() {
        if (this.logLevel >= LogLevel.LOG_LEVEL_INFO) {
            this.print('INFO', arguments)
        }
    }

    warn() {
        if (this.logLevel >= LogLevel.LOG_LEVEL_WARN) {
            this.print('WARN', arguments)
        }
    }

    error() {
        if (this.logLevel >= LogLevel.LOG_LEVEL_ERROR) {
            this.print('ERROR', arguments)
        }
    }

    print(levelPrefix, messages) {
        if(messages.length > 0){
            let lineLink = ''
            let lineNumber = ''

            let error = new Error();
            if(error.stack){
                let callerLine = error.stack.split("\n")[3]
                let startIndex = callerLine.indexOf("(")
                let endIndex = callerLine.lastIndexOf(")")

                lineLink = callerLine.substring(startIndex + 1, endIndex)
                lineNumber = lineLink.split(":", 3)[2]

                if(lineNumber){
                    lineNumber = ':' + lineNumber
                }else{
                    lineNumber = '';
                }
            }

            let dateTime = DateConveter.dateToString(new Date(), 'yyyy.MM.dd HH:mm:ss.sss');
            let position = this.logName + lineNumber
            let title = '[' + dateTime + '][' + levelPrefix + '][' + position +'] '
            let message = messages[0]

            if(messages.length>1){
                for(let i=1;i<messages.length;i++){
                    let obj
                    if(typeof messages[i] === 'object'){
                        obj = JSON.stringify(messages[i])
                    }else if(messages[i] && messages[i].toString){
                        obj = messages[i].toString()
                    }else{
                        obj = messages[i]
                    }
                    message = message.replace('{}', obj)
                }
            }

            let printMessage;
            if(levelPrefix === 'DEBUG' || levelPrefix === 'TRACE'){
                printMessage = title + message + (lineLink ? "\n(stack : " + lineLink+")" : '');
            }else{
                printMessage = title + message
            }

            if(this.logColor){
                let color;
                switch(levelPrefix){
                    case 'DEBUG':
                        color = 'rgb(54, 156, 244)'
                        break;
                    case 'TRACE':
                        color = 'rgb(0, 125, 60)'

                        break;
                    case 'INFO':
                        color = 'rgb(255, 255, 255)'

                        break;
                    case 'WARN':
                        color = 'rgb(225, 125, 50)'
                        break;
                    case 'ERROR':
                        color = 'red'
                        break;
                }
                console.log('%c'+printMessage, 'color:'+ color)
            }else{
                console.log(printMessage);
            }
            this.logViewer.print(dateTime, levelPrefix, position, message)

        }
    }
}