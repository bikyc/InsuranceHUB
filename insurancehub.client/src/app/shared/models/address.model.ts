import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';

export class Address {
  public AddressType: string = '';
  public PatientAddressId: number = 0;
  public PatientId: number = 0;
  public Street1: string = '';
  public Street2: string = '';
  public CountryId: number = 0;
  public CountrySubDivisionId: number = 0;
  public City: string = '';
  public ZipCode: string = '';
  public CountryName: string = '';
  public CountrySubDivisionName: string = '';
  public AddressValidator: FormGroup;

  constructor(defAddressType: string = '') {
    const fb = new FormBuilder();

    this.AddressValidator = fb.group({
      AddressType: [defAddressType, Validators.required],
      Street1: ['', [Validators.required, Validators.maxLength(30)]],
      CountryId: ['', Validators.required],
      CountrySubDivisionId: ['', Validators.required],
      City: ['', Validators.required]
    });
  }

  public IsDirty(fieldName?: string): boolean {
    if (!fieldName) {
      return this.AddressValidator.dirty;
    }

    const field = this.AddressValidator.get(fieldName);
    return field ? field.dirty : false;
  }

  public IsValid(): boolean {
    return this.AddressValidator.valid;
  }

  public IsValidCheck(fieldName?: string, validator?: string): boolean {
    // If form untouched, consider valid
    if (!this.AddressValidator.dirty) {
      return true;
    }

    if (!fieldName) {
      return this.AddressValidator.valid;
    }

    const field = this.AddressValidator.get(fieldName);
    if (!field || !validator) {
      return true;
    }

    return !field.hasError(validator);
  }
}
