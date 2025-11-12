import { Component, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreService } from '../shared-services/core-service/core.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './danphe-confirmation-dialog.component.html',
  styleUrls: ['./danphe-confirmation-dialog.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DanpheConfirmationDialogComponent implements OnInit {
  title: string = "";
  message: string = "";
  confirm: EventEmitter<void> = new EventEmitter<void>();
  cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _coreService: CoreService) {

  }
  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
  ngOnInit(): void {
    this._coreService.FocusInputById('id_btn_confirm_confirmation');
  }

  MoveFocus(e: KeyboardEvent, idToFocus: string = 'id_btn_confirm_confirmation'): void {
    if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
      this._coreService.FocusInputById(idToFocus);
    }
  }

}
