export class PatientIdentity {
    IdentityTypeId: number = 0;
    IdentityValue: string = "";
    ExpiryDate: Date | null = null;
    IssueDate: Date | null = null;
    IsNew: boolean = false;
    IsActive: boolean = true;
}
