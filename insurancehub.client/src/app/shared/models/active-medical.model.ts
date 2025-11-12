
export class ActiveMedical {
    public PatientId: number = 0;
    public PatientProblemId: number = 0;
    public ICD10Code: string = '';
    public ICD10Description: string = '';
    public CurrentStatus: string = '';
    public OnSetDate: string = '';
    public IsResolved: boolean = false;
    public ResolvedDate: string = '';
    public Note: string = '';

    public CreatedBy: number = 0;
    public ModifiedBy: number = 0;
    public CreatedOn: string = '';
    public ModifiedOn: string = '';
    public PrincipleProblem: boolean = false;

}