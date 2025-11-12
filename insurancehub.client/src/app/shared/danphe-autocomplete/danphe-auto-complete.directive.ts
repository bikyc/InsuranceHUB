import {
  Directive,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  Host,
  Optional,
  ElementRef
} from "@angular/core";
import { DanpheAutoCompleteComponent } from "./danphe-auto-complete.component";
import { ControlContainer, AbstractControl, FormGroup, FormControl, FormGroupName, FormGroupDirective } from "@angular/forms";

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: "[auto-complete], [danphe-auto-complete]",
  standalone: false
})
export class DanpheAutoCompleteDirective implements OnInit {

  @Input("auto-complete-placeholder") autoCompletePlaceholder: string='';
  @Input("source") source: any;
  @Input("path-to-data") pathToData: string='';
  @Input("min-chars") minChars: number=0;
  @Input("display-property-name") displayPropertyName: string='';
  @Input("accept-user-input") acceptUserInput: boolean=false;
  @Input("max-num-list") maxNumList: string='';
  @Input("select-value-of") selectValueOf: string='';

  @Input("list-formatter") listFormatter: any;
  @Input("grid-sort") gridsort: any;

  @Input("loading-text") loadingText: string = "Loading";
  @Input("blank-option-text") blankOptionText: string='';
  @Input("no-match-found-text") noMatchFoundText: string='';
  @Input("value-formatter") valueFormatter: any;
  @Input("tab-to-select") tabToSelect: boolean = true;
  @Input("match-formatted") matchFormatted: boolean = false;
  //sud:23May'21--Precondition: matchFormatted should be true.
  //if propertyNameToMatch is given, then the matching function checks only for the given property name's value.
  //Check in its implementation for details.
  @Input("match-property-csv") propertyNamesToMatchCSV: string='';

  @Input() ngModel: any;
  @Input('formControlName') formControlName: string='';
  //if [formControl] is used on the anchor where our directive is sitting
  //a form is not necessary to use a formControl we should also support this
  @Input('formControl') extFormControl: FormControl|undefined;

  @Output() ngModelChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();


  componentRef: ComponentRef<DanpheAutoCompleteComponent>|undefined=undefined;
  wrapperEl: HTMLElement|undefined=undefined;
  el: HTMLElement;   // this element element, can be any
  acDropdownEl: HTMLElement|undefined; // auto complete element
  inputEl: HTMLInputElement|undefined=undefined;  // input element of this element
  formControl: AbstractControl|undefined=undefined;
  revertValue: any;

  constructor(
    public renderer: Renderer2,
    public viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    @Optional() @Host() @SkipSelf() public parentForm: ControlContainer) {
    this.el = this.elementRef.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    // wrap this element with <div class="ng2-auto-complete">
    this.wrapperEl = document.createElement("div") as HTMLElement;
    this.wrapperEl.className = "danphe-auto-complete-wrapper";
    this.wrapperEl.style.position = "relative";
    this.el.parentElement?.insertBefore(this.wrapperEl, this.el.nextSibling);
    this.wrapperEl.appendChild(this.el);


    //Check if we were supplied with a [formControlName] and it is inside a [form]
    //else check if we are supplied with a [FormControl] regardless if it is inside a [form] tag
    if (this.parentForm && this.formControlName) {
      if (this.parentForm instanceof FormGroupName) {
        this.formControl = this.parentForm.control.controls[this.formControlName] as AbstractControl;
      } else if (this.parentForm instanceof FormGroupDirective) {
        this.formControl = this.parentForm.form.get(this.formControlName) || undefined;
      } else {
        // Fallback: try to access form property if it exists
        const parentFormAny = this.parentForm as any;
        if (parentFormAny.form && parentFormAny.form instanceof FormGroup) {
          this.formControl = parentFormAny.form.get(this.formControlName) || undefined;
        }
      }
    } else if (this.extFormControl) {
      this.formControl = this.extFormControl;
    }

    // apply toString() method for the object
    if (!!this.ngModel) {
      this.selectNewValue(this.ngModel);
    } else if (!!this.formControl && this.formControl.value) {
      const formValue = this.formControl.value;
      if (this.displayPropertyName && formValue && typeof formValue === 'object') {
        this.selectNewValue(formValue[this.displayPropertyName]);
      } else if (formValue) {
        this.selectNewValue(formValue);
      }
    }

  }

  ngAfterViewInit() {
    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    this.inputEl = this.el.tagName === "INPUT" ?
      <HTMLInputElement>this.el : <HTMLInputElement>this.el.querySelector("input");

    if (this.inputEl) {
      this.inputEl.addEventListener('focus', e => this.showAutoCompleteDropdown(e));
      this.inputEl.addEventListener('blur', e => this.hideAutoCompleteDropdown(e));
      this.inputEl.addEventListener('keydown', e => this.keydownEventHandler(e));
      this.inputEl.addEventListener('input', e => this.inputEventHandler(e));
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngModel']) {
      this.ngModel = this.setToStringFunction(changes['ngModel'].currentValue);
    }
  }

  //show auto-complete list below the current element
  showAutoCompleteDropdown = (event?: any): void => {

    this.componentRef = this.viewContainerRef.createComponent(DanpheAutoCompleteComponent);

    let component = this.componentRef.instance;
    component.showInputTag = false; //Do NOT display autocomplete input tag separately

    component.pathToData = this.pathToData;
    component.minChars = this.minChars;
    component.source = this.source;
    component.placeholder = this.autoCompletePlaceholder;
    component.acceptUserInput = this.acceptUserInput;
    if (this.maxNumList) {
      component.maxNumList = parseInt(this.maxNumList, 10);
    }
    component.gridsort = this.gridsort;
    component.loadingText = this.loadingText;
    component.listFormatter = this.listFormatter;
    component.blankOptionText = this.blankOptionText;
    component.noMatchFoundText = this.noMatchFoundText;
    component.tabToSelect = this.tabToSelect;
    component.matchFormatted = this.matchFormatted;
    component.propertyNamesToMatchCSV = this.propertyNamesToMatchCSV;//sud:23May'21--custom functionality added.<check for it's implementation inside autocomplete

    component.valueSelected.subscribe(this.selectNewValue);

    this.acDropdownEl = this.componentRef.location.nativeElement;
    if (this.acDropdownEl) {
      this.acDropdownEl.style.display = "none";
    }

    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    if (this.el.tagName !== "INPUT" && this.acDropdownEl && this.inputEl && this.inputEl.parentElement) {
      this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
    }

    this.revertValue = typeof this.ngModel !== "undefined" ? this.ngModel : (this.inputEl ? this.inputEl.value : '');

    setTimeout(() => {
      if (this.inputEl) {
        component.reloadList(this.inputEl.value);
        this.styleAutoCompleteDropdown();
        component.dropdownVisible = true;
      }
    });
  };

  hideAutoCompleteDropdown = (event?: any): void => {
    if (this.componentRef) {
      let currentItem: any;
      let hasRevertValue = (typeof this.revertValue !== "undefined");
      if (this.inputEl && hasRevertValue && this.acceptUserInput === false) {
        currentItem = this.componentRef.instance.findItemFromSelectValue(this.inputEl.value);
      }

      this.componentRef.destroy();
      this.componentRef = undefined;

      if (
        this.inputEl &&
        hasRevertValue &&
        this.acceptUserInput === false &&
        currentItem === null
      ) {
        this.selectNewValue(this.revertValue);
      }

    }
  };

  styleAutoCompleteDropdown = () => {
    if (this.componentRef && this.inputEl && this.acDropdownEl) {
      let component = this.componentRef.instance;

      /* setting width/height auto complete */
      let thisElBCR = this.el.getBoundingClientRect();
      let thisInputElBCR = this.inputEl.getBoundingClientRect();
      let closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;

      this.acDropdownEl.style.width = thisInputElBCR.width + "px";
      this.acDropdownEl.style.position = "absolute";
      this.acDropdownEl.style.zIndex = "12";//sud:23Jul'19--change to 12 from 1 since it was coming below focused cell of danphe-grid.
      this.acDropdownEl.style.left = "0";
      this.acDropdownEl.style.display = "inline-block";

      if (closeToBottom) {
        this.acDropdownEl.style.bottom = `${thisInputElBCR.height}px`;
      } else {
        this.acDropdownEl.style.top = `${thisInputElBCR.height}px`;
      }
    }
  };

  setToStringFunction(item: any): any {
    if (item && typeof item === "object") {
      let displayVal;

      if (typeof this.valueFormatter === 'string') {
        let matches = this.valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
        let formatted = this.valueFormatter;
        if (matches && typeof item !== 'string') {
          matches.forEach(key => {
            formatted = formatted.replace(key, item[key]);
          });
        }
        displayVal = formatted;
      } else if (typeof this.valueFormatter === 'function') {
        displayVal = this.valueFormatter(item);
      } else if (this.displayPropertyName) {
        displayVal = item[this.displayPropertyName];
      } else if (typeof this.listFormatter === 'string' && this.listFormatter.match(/^\w+$/)) {
        displayVal = item[this.listFormatter];
      } else {
        displayVal = item.value;
      }
      item.toString = function () {
        return displayVal;
      }
    }
    return item;
  }

  selectNewValue = (item: any) => {
    // make displayable value
    if (item && typeof item === "object") {
      item = this.setToStringFunction(item);
    }
    if (this.inputEl) {
      this.inputEl.value = '' + item;
    }

    // make return value
    let val = item;
    if (this.selectValueOf && item && typeof item === "object" && item[this.selectValueOf]) {
      val = item[this.selectValueOf];
    }
    if (this.formControl && ((this.parentForm && this.formControlName) || this.extFormControl)) {
      if (!!val) {
        this.formControl.patchValue(val);
      }
    }
    (val !== this.ngModel) && this.ngModelChange.emit(val);
    this.valueChanged.emit(val);
    this.hideAutoCompleteDropdown();
  };

  public keydownEventHandler = (evt: any) => {
    if (this.componentRef) {
      let component = <DanpheAutoCompleteComponent>this.componentRef.instance;
      component.inputElKeyHandler(evt);
    }
  };

  public inputEventHandler = (evt: any) => {
    if (this.componentRef) {
      let component = <DanpheAutoCompleteComponent>this.componentRef.instance;
      component.dropdownVisible = true;
      component.reloadListInDelay(evt);
    } else {
      this.showAutoCompleteDropdown()
    }
  };

}
