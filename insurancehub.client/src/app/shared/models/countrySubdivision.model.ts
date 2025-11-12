import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

export class CountrySubdivision {
  public CountrySubDivisionId: number = 0;
  public CountryId: number = 0;
  public CountrySubDivisionName: string = '';
  public CountrySubDivisionCode: string = '';
  public CreatedBy: number = 0;
  public CreatedOn: string = '';
  public IsActive: boolean = true;
  public ModifiedBy: number = 0;
  public ModifiedOn: string = '';

  public SubdivisionValidator: FormGroup;

  constructor() {
    const fb = new FormBuilder();
    this.SubdivisionValidator = fb.group({
      CountryId: ['', Validators.required],
      CountrySubDivisionName: ['', Validators.required],
    });
  }

  public IsDirty(fieldName?: string): boolean {
    if (!fieldName) {
      return this.SubdivisionValidator.dirty;
    }
    const field = this.SubdivisionValidator.get(fieldName);
    return field ? field.dirty : false;
  }

  public IsValid(): boolean {
    return this.SubdivisionValidator.valid;
  }

  public IsValidCheck(fieldName?: string, validator?: string): boolean {
    if (!fieldName) {
      return this.SubdivisionValidator.valid;
    }
    const field = this.SubdivisionValidator.get(fieldName);
    return field ? !field.hasError(validator || '') : false;
  }
}

export class Municipality {
  public MunicipalityId: number = 0;
  public MunicipalityName: string = '';
  public CountrySubDivisionId: number = 0;
  public CountryId: number = 0;
  public CountrySubDivisionName: string = '';
  public CountryName: string = '';
  public Type: string = '';
  public CreatedBy: number = 0;
  public CreatedOn: string = '';
  public IsActive: boolean = true;
  public ModifiedBy: number = 0;
  public ModifiedOn: string = '';

  public MunicipalityValidator: FormGroup;

  constructor() {
    const fb = new FormBuilder();
    this.MunicipalityValidator = fb.group({
      CountryId: ['', Validators.required],
      SubDivisionId: ['', Validators.required],
      MunicipalityName: ['', Validators.required],
    });
  }

  public IsDirty(fieldName?: string): boolean {
    if (!fieldName) {
      return this.MunicipalityValidator.dirty;
    }
    const field = this.MunicipalityValidator.get(fieldName);
    return field ? field.dirty : false;
  }

  public IsValid(): boolean {
    return this.MunicipalityValidator.valid;
  }

  public IsValidCheck(fieldName?: string, validator?: string): boolean {
    if (!fieldName) {
      return this.MunicipalityValidator.valid;
    }
    const field = this.MunicipalityValidator.get(fieldName);
    return field ? !field.hasError(validator || '') : false;
  }
}
