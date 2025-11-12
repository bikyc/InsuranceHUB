import {
    NgForm,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms'
import * as moment from 'moment/moment';

export class PatientFilesModel {

    public PatientFileId: number = 0;
    public PatientId: number = 0;
    public FileType: string = "";
    public Title: string = "";
    public UploadedOn: string = "";
    public UploadedBy: number = 0;
    public Description: string = "";
    public FileBinaryData: string = "";
    public FileName: string = "";
    public FileExtention: string = "";
    public IsActive: boolean = true;
    public FileBase64String: string = "";
}