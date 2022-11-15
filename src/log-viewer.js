import '../css/main.css';
import DateConveter from "./date-converter";

export default class LogViewer{
    constructor(isShowing) {
        this.setView(isShowing)
        //web-logger-js-container
        //web-logger-js-tool-info
        //web-logger-js-tool-download
        //web-logger-js-tool-clear
        //web-logger-js-message-debug
        //web-logger-js-message-trace
        //web-logger-js-message-info
        //web-logger-js-message-warn
        //web-logger-js-message-error
        this.view;
        this.style = {
            container : {
                position : 'absolute',
                zIndex : '10000',
                bottom : '0',
                left : '0',
                backgroundColor : 'rgba(0,0,0,0.8)',
                border : '1px solid #CCC',
                padding : '8px',
                width : 'calc(100% - 18px)',
                height : '180px',
                /*maxWidth : 'calc(100% - 18px)',
                maxHeight : 'calc(100% - 18px)',*/
                overflow : 'auto',
                fontSize : '13px',
                fontFamily : 'font-family: Arial, Helvetica, sans-serif'
            },
            tool : {
                info : {
                    color : 'rgb(255, 255, 255)'
                },
                download : {
                    border : 0,
                    background : 'none',
                    color : '#00b3f0',
                    cursor : 'pointer'
                },
                clear : {
                    border : 0,
                    background : 'none',
                    color : '#00b3f0',
                    cursor : 'pointer'
                }
            },
            message : {
                debug : {
                    color : 'rgb(54, 156, 244)'
                },
                trace : {
                    color : 'rgb(0, 125, 60)'
                },
                info : {
                    color : 'rgb(255, 255, 255)'
                },
                warn : {
                    color : 'rgb(225, 125, 50)'
                },
                error : {
                    color : 'rgb(255, 255, 255)',
                    backgroundColor : 'rgb(190, 0, 0)'
                }
            }
        }
    }
    setView(isShowing){
        this.isShowing = isShowing ? isShowing : false

        const VIEW_ID = '__log_viewer__'

        if(this.isShowing){
            this.view = document.body.querySelector('#' + VIEW_ID)

            if(!this.view){
                this.view = document.createElement("div")
                this.view.id = VIEW_ID
                this.view.className = 'web-logger-js-container';

                let toolContainer = document.createElement("div")
                let downloadButton = document.createElement("button")
                let autoScrollCheckbox = document.createElement("checkbox")
                let clearButton = document.createElement("button")
                let infoSpan = this.infoSpan = document.createElement("span");

                infoSpan.className = 'web-logger-js-tool-info';
                downloadButton.className = 'web-logger-js-tool-download';
                clearButton.className = 'web-logger-js-tool-clear';

                let messageContainer = this.messageContainer = document.createElement("div")

                downloadButton.innerHTML = 'Download'
                clearButton.innerHTML = 'Clear'

                toolContainer.appendChild(infoSpan);
                toolContainer.appendChild(downloadButton)
                toolContainer.appendChild(autoScrollCheckbox)
                toolContainer.appendChild(clearButton)
                clearButton.onclick = function(){
                    infoSpan.innerHTML = '0 lines.'
                    messageContainer.innerHTML = ''
                }
                downloadButton.onclick = function(){
                    let messages = ''
                    let div = messageContainer.getElementsByTagName("div")//getElementsByTagName('div')

                    for(var i=0;i<div.length;i++){
                        messages += div[i].innerHTML.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "") + '\n'
                    }

                    var hiddenElement = document.createElement('a')
                    hiddenElement.href = 'data:attachment/text,' + encodeURI(messages)
                    hiddenElement.target = '_blank'
                    hiddenElement.download = window.location.hostname + '_' + DateConveter.dateToString(new Date(), 'yyyyMMddHHmmss'); + '.log'
                    hiddenElement.click()

                }
                this.view.appendChild(toolContainer)
                this.view.appendChild(messageContainer)

                /*let positionX = 0;
                let positionY = 0;
                this.view.addEventListener('click', function(e){
                    positionX = Number((this.style.left).replace("px",""));
                    positionY = Number((this.style.top).replace("px",""));
                }, {
                    capture : false
                });
                window.addEventListener('drag', (e)=>{
                    this.view.style.left = Number(this.view.style.left.replace("px","")) + (e.offsetX - positionX);
                    this.view.style.top =  Number(this.view.style.top.replace("px","")) + (e.offsetY - positionY);

                });*/

                document.body.appendChild(this.view)
            }
        }else{
            this.view = document.body.querySelector("#" + VIEW_ID)
            if(this.view){
                document.body.removeChild(this.view)
            }
            this.view = undefined
        }
    }
    print(time, level, name, message){
        if(!this.view){
            return;
        }

        let logLine = document.createElement("div")

        let dateTime = document.createElement('span')
        let logLevel = document.createElement('span')
        let logName = document.createElement('span')
        let logMessage = document.createElement("span")

        dateTime.innerHTML = '[' + time + '] '
        logLevel.innerHTML = '[' + level + '] '
        logName.innerHTML = '[' + name + '] '
        logMessage.innerHTML = message

        logLine.appendChild(dateTime)
        logLine.appendChild(logLevel)
        logLine.appendChild(logName)
        logLine.appendChild(logMessage)

        switch(level){
            case 'DEBUG':
                logLine.className = 'web-logger-js-message-debug';
                break;
            case 'TRACE':
                logLine.className = 'web-logger-js-message-trace';
                break;
            case 'INFO':
                logLine.className = 'web-logger-js-message-info';
                break;
            case 'WARN':
                logLine.className = 'web-logger-js-message-warn';
                break;
            case 'ERROR':
                logLine.className = 'web-logger-js-message-error';
                break;
        }

        this.messageContainer.appendChild(logLine)

        this.infoSpan.innerHTML = this.messageContainer.childElementCount + ' lines.'
        this.view.scrollTop = this.view.scrollHeight
    }
}