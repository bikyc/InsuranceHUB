export class MedicationPrescription {
    public MedicationPrescriptionId: number = 0;
    public PatientId: number = 0;
    public MedicationId: number=0;
    public MedicationName: string = '';
    public ProviderId: number=0;
    public ProviderName: string = '';
    
    public Frequency: string = '';
    public Route: string = '';
    public Duration: number=0;
    public DurationType: string = '';
    public Dose: string = '';
    public Refill: number=0;
    public TypeofMedication: string = '';
    public CreatedBy: number=0;
    public ModifiedBy: number=0;
    public CreatedOn: string = '';
    public ModifiedOn: string = '';
    public IsSelected: boolean = false;

}