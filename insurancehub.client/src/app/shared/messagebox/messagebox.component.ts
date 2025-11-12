import { Component, Input } from '@angular/core';
import { MessageboxService } from './messagebox.service';

@Component({
  selector: "app-danphe-msgbox",
  templateUrl: "./messagebox.html"
})
export class MessageBoxComponent {
  @Input()
  public showmsgbox = false;
  @Input()
  public status = "";
  @Input()
  public message = "";


  constructor(public msgBoxService: MessageboxService) {

  }

  Close(ind: number) {
    this.msgBoxService.hide(ind);
  }

}
