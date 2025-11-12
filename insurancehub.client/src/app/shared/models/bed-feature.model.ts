export class BedFeature {
    public BedFeatureId: number = 0;
    public BedFeatureCode: string = "";
    public BedFeatureName: string = "";
    public BedFeatureFullName: string = "";
    public BedPrice: number = 0;

    public CreatedBy: number = 0;
    public ModifiedBy: number = 0;
    public IsActive: boolean = true;

    public CreatedOn: string = "";
    public ModifiedOn: string = "";

    public IsSelected: boolean = false;
    public TaxApplicable: boolean = false 
    public IsPresentationGrouping: boolean = false;
    public GroupCode: string = "";
    public PriceCategoryId: number = 0;
    public PriceCategoryName: string = '';
    public Price: number = 0;
    public IsZeroPriceAllowed: boolean = false;

}
