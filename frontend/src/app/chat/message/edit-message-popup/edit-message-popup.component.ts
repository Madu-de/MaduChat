import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LanguageService} from "../../../services/language.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../../classes/Message";

@Component({
  selector: 'app-edit-message-popup',
  templateUrl: './edit-message-popup.component.html',
  styleUrls: ['./edit-message-popup.component.scss']
})
export class EditMessagePopupComponent implements OnInit {

  public editForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<EditMessagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: Message },
    public languageService: LanguageService,
  ) {
  }

  ngOnInit() {
    this.editForm.controls['message']?.setValue(this.data?.message?.message);
  }

  saveEditMessage() {
    this.dialogRef.close(this.editForm.value?.message);
  }
}
