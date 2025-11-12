import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import moment from 'moment';

export class Guarantor {
  public PatientGurantorInfo: number = 0;
  public PatientId: number = 0;
  public GuarantorSelf: boolean = false;
  public PatientRelationship: string = '';
  public GuarantorName: string = '';
  public GuarantorGender: string = '';
  public GuarantorCountryId: number = 0;
  public GuarantorPhoneNumber: string = '';
  public GuarantorDateOfBirth: string = '';
  public GuarantorStreet1: string = '';
  public GuarantorStreet2: string = '';
  public GuarantorCountrySubDivisionId: number = 0;
  public GuarantorCity: string = '';
  public GuarantorZIPCode: string = '';
  public GuarantorValidator: FormGroup;

  constructor() {
    const fb = new FormBuilder();

    function dateValidator(control: AbstractControl): ValidationErrors | null {
      if (!control.value) return null;
      const currDate = moment().format('YYYY-MM-DD');
      if (
        moment(control.value).diff(currDate) > 0 ||
        moment(control.value).diff(currDate, 'years') < -200
      ) {
        return { wrongDate: true };
      }
      return null;
    }

    this.GuarantorValidator = fb.group({
      GuarantorName: ['', Validators.required],
      PatientRelationship: ['', Validators.required],
      GuarantorDateOfBirth: ['', dateValidator],
      GuarantorPhoneNumber: ['', Validators.pattern('^[0-9]{1,10}$')],
    });
  }

  public IsDirty(fieldName?: string): boolean {
    if (!fieldName) {
      return this.GuarantorValidator.dirty;
    }
    const field = this.GuarantorValidator.get(fieldName);
    return field ? field.dirty : false;
  }

  public IsValid(): boolean {
    return this.GuarantorValidator.valid;
  }

  public IsValidCheck(fieldName?: string, validator?: string): boolean {
    // If untouched, treat as valid
    if (!this.GuarantorValidator.dirty) {
      return true;
    }
    if (!fieldName) {
      return this.GuarantorValidator.valid;
    }
    const field = this.GuarantorValidator.get(fieldName);
    if (!field || !validator) {
      return true;
    }
    return !field.hasError(validator);
  }
}
