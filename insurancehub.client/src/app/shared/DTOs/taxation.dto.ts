export class TaxationTypeDto {
    TaxationTypeId: number=0;
    TaxationCode: string='';
    TaxationTypeName: string='';
    TaxationGroups?: TaxationGroupDto[];
}

export class TaxationGroupDto {
    TaxationGroupId: number = 0;
    TaxationTypeId: number=0;
    TaxationGroupCode: string='';
    TaxationGroupName: string='';
    TaxationGroupDisplayName: string='';
    TaxPercentage: number = 0;
    DisplaySequence: number=0;
    TaxationSubGroups?: TaxationSubGroupDto[];
}

export class TaxationSubGroupDto {
    TaxationSubGroupId: number=0;
    TaxationGroupId: number=0;
    TaxationSubGroupCode: string='';
    TaxationSubGroupName: string='';
    TaxationSubGroupDisplayName: string='';
    DisplaySequence: number=0;
    TaxationRate: number=0;
    IsTaxExempt: boolean=false;
    TaxationValidityStart?: Date;
    TaxationValidityEnd?: Date;
}

export class TaxationDetailDto {
    TaxationDetailId: number=0;
    InvoiceId?: number=0;
    InvoiceItemId: number=0;
    TaxationSubGroupId: number=0;
    TaxationRate: number=0;
    TaxableAmount: number=0;
    TaxAmount: number=0;
    IsActive: boolean=false;
}

export class TaxBreakDownDto {
    HSNCode: string = '';
    GSTPercentage: number = 0;
    TaxableAmount: number = 0;
    SGSTPercentage: number = 0;
    SGSTAmount: number = 0;
    CGSTPercentage: number = 0;
    CGSTAmount: number = 0;
    IGSTPercentage: number = 0;
    IGSTAmount: number = 0;
    TaxAmount: number = 0;
}


export class AppliedTax {
    TaxationDetailId: number = 0;
    TaxationTypeId: number = 0;
    TaxationTypeName: string = '';
    TaxationGroupId: number = 0;
    TaxationGroupDisplayName: string = '';
    TaxationSubGroupId: number = 0;
    TaxationSubGroupDisplayName: string = '';
    TaxableAmount: number = 0;
    TaxationRate: number = 0;
    TaxAmount: number = 0;
    HSCode: string = '';
}

export class PHRMItemTaxationDetailsDto {
    public ItemTaxationDetailId: number = 0;
    public ItemId: number = 0;
    public TaxationTypeId: number = 0;
    public TaxGroupId: number = 0;
    public IsActive: boolean = true;
    public TaxType: string = '';
    public Priority?: number=0;
}
