import { Injectable } from "@angular/core";
import { TaxationGroupDto, TaxationSubGroupDto, TaxationTypeDto } from "../../DTOs/taxation.dto";

@Injectable()
export class PharmacyService {
    TaxationTypes: TaxationTypeDto[] = [];
    TaxationGroups: TaxationGroupDto[] = [];
    TaxationSubGroups: TaxationSubGroupDto[] = [];
    constructor() { }
    SetTaxationTypes(taxationTypes: TaxationTypeDto[]) {
        this.TaxationTypes = taxationTypes;
    }
    SetTaxationGroups(taxationGroups: TaxationGroupDto[]) {
        this.TaxationGroups = taxationGroups;
    }
    SetTaxationSubGroups(TaxationSubGroup: TaxationSubGroupDto[]) {
        this.TaxationSubGroups = TaxationSubGroup;
    }
}