export class CFGParameterModel {
  public ParameterId: number = 0;
  public ParameterGroupName: string = '';
  public ParameterName: string = '';
  public ParameterValue: any = null;
  public ValueDataType: string = '';
  public Description: string = '';
  public ParameterType: string = '';

  public ValueLookUpList: string = '';

  public MappedObject: Array<MappedObj> = [];
  public MappedArray: Array<Array<MappedObj>> = [];

}
export class MappedObj {
  public KeyName: string = '';
  public Value: string = '';

  public ValueType: string = '';
  public ActualValueType: string = '';
  public OuterKeyName: string = '';
}
