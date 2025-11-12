
import { Injectable } from '@angular/core';
import { MessageboxModel } from './messagebox.model';

@Injectable({
  providedIn: 'root'
})
export class MessageboxService {



  globalMsgbox: MessageboxModel[] = [];
  public defaultDisplayTime = 7000;//7000milliseconds=7seconds

  //default autoHide=true, for some cases user will have to manually close the messagebox.

  public showMessage(status: string, messageArray: string[], errorLog = '', autoHide = true) {
    const newMsg: MessageboxModel = new MessageboxModel();
    newMsg.message = messageArray;
    newMsg.status = status;
    newMsg.show = true;

    this.globalMsgbox.push(newMsg);

    //log the error if the status is 'failed' or 'error'


    if ((status == "error" || status == "failed") && messageArray && messageArray.length > 0) {
      messageArray.forEach(msg => {
        console.log(msg);
        //wherever it get err mgs it redirect it to /Account/Login 
        if (msg.includes("Unauthorized")) {
          window.location.href = "/Account/Login";

        }
      });
      if (errorLog) {
        console.log(errorLog);
      }

    }
    //automatically hide after certain time.
    if (autoHide) {
      setTimeout(function () {
        newMsg.show = false;
      }.bind(this), this.defaultDisplayTime);
    }


  }


  public hide(indx: number) {
    this.globalMsgbox[indx].show = false;
    this.globalMsgbox.splice(indx, 1);
    this.globalMsgbox.slice();
  }
}
