import { Router } from '@angular/router';

import { NepaliCalendarService } from './calendar/np/nepali-calendar.service';
import { SecurityService } from './shared-services/security/security.service';
import moment from 'moment';
import { PrinterSettingsModel } from '../setting/printers/select-printer/printer-settings.model';
import { CoreService } from './shared-services/core-service/core.service';


//common functions are groupped in this class. 
//all functions should be static and shouldn't require to instantiate or injected.
export class CommonFunctions {
  constructor(public npCalendarService: NepaliCalendarService,
    public coreService: CoreService,
    public router: Router,
    public securityService: SecurityService) {

  }
  //format's the age according to our requirement.
  //sample output formats: 21 D/F, 3 Y/M, 19 M/M, 24 Y/F, etc..
  //logic: show days(D) for less than month, months(M) for less than 3 Years.
  //       show years (Y) for above 3 years.
  // take the lower bound if month or year is not completed yet. ( don't show two date names eg: 1 M 23 D , 4Y 3M,.. ) 
  //notable cases: i. 59 days will still remain to be 1 M ii. 3yr-365days will be: 3 Y 
  public getcheckouttimeparameter(): string {
    return this.coreService.Parameters
      .find(p => p.ParameterGroupName == "ADT" && p.ParameterName == "CheckoutTime")
      ?.ParameterValue || "";
  }


  static GetFormattedAge(dateOfBirth: any): string {
    let currentDate = moment().format('YYYY-MM-DD');
    let years = moment(currentDate).diff(moment(dateOfBirth).format('YYYY-MM-DD'), 'years');
    let totMonths = moment(currentDate).diff(moment(dateOfBirth).format('YYYY-MM-DD'), 'months');
    let totDays = moment(currentDate).diff(moment(dateOfBirth).format('YYYY-MM-DD'), 'days');
    //show years if it's above 1.
    if (years >= 1) {
      return years.toString() + ' Y';
    }
    //show days for less than 1 month. 
    else if (totMonths < 1) {
      if (Number(totDays) == 0)
        totDays = 1;
      return totDays.toString() + ' D';
    }
    //else show only months for 1 to 35 months (other cases are checked in above conditions).
    else {
      return totMonths.toString() + ' M';
    }

  }
  static GetFormattedAgeforSticker(dateOfBirth: string, agewithageunit: string): string {
    let ageunit = agewithageunit.slice(agewithageunit.length - 1);
    let currentDate = moment().format('YYYY-MM-DD');
    let years = moment(currentDate).diff(moment(dateOfBirth).format('YYYY-MM-DD'), 'years');
    let totMonths = moment(currentDate).diff(moment(dateOfBirth).format('YYYY-MM-DD'), 'months');
    let totDays = moment(currentDate).diff(moment(dateOfBirth).format('YYYY-MM-DD'), 'days');
    //show years if it's above 1.
    if (years >= 1 && ageunit == "Y") {
      return years.toString() + ' Y';
    }
    else if (ageunit == 'M') {
      return totMonths.toString() + 'M';
    }
    //show days for less than 1 month. 
    else if (ageunit == "D") {
      if (Number(totDays) == 0)
        totDays = 1;
      return totDays.toString() + 'D';
    }
    //else show only months for 1 to 35 months (other cases are checked in above conditions).
    else {
      return years.toString() + ' Y';
    }

  }
  //return format: 3 Y/M, 19 M/M, 24 Y/F, etc.. check above function 'GetFormattedAge' for age format . 
  static GetFormattedAgeSex(dateOfBirth: string, gender: string) {
    if (dateOfBirth && dateOfBirth.trim() && dateOfBirth.trim().length > 0) {
      let age = CommonFunctions.GetFormattedAge(dateOfBirth);
      let ageSex = age + "/" + gender.charAt(0).toUpperCase();
      return ageSex;
    }
    return "";
  }
  static GetFormattedAgeSexForPatientConsumption(age: string, gender: string) {
    let ageSex = age + "/" + gender;
    return ageSex;
  }
  static GetFormattedAgeSexforSticker(dateOfBirth: string, gender: string, agewithageunit: string) {
    let age = CommonFunctions.GetFormattedAgeforSticker(dateOfBirth, agewithageunit);
    let ageSex = age + "/" + gender.charAt(0).toUpperCase();
    return ageSex;
  }
  static GetFormattedSex(gender: string) {
    return gender.charAt(0).toUpperCase();
  }
  static GetFullName(firstName: string, middleName: string, lastName: string): string {
    if (middleName)
      return firstName + " " + middleName + " " + lastName;
    else
      return firstName + " " + lastName;
  }

  //Return proper floating number with 2 fraction number
  static parseAmount(inputVal: any, decimalUpto: number = 2): any {
    if (inputVal) {
      let z = isNaN(inputVal) ? 0 : ((inputVal - Math.floor(inputVal)) != 0) ? inputVal.toFixed(decimalUpto) : inputVal.toFixed();
      //changed > 0.9 to 0.98 to accomodate minimal difference in calculation.
      //earlier we were rounding off 0.9 to 1, now we're rounding off >0.985 to 1.. 
      //this gives us better precision..
      var refVal = '0.' + '9'.repeat(decimalUpto - 1) + '8';
      if ((z - Math.floor(z)) > (+refVal)) { z = inputVal.toFixed() }
      return parseFloat(z);
    } else { return 0; }
  }

  static parseDecimal(inputVal: any): any {
    if (inputVal) {
      let z = isNaN(inputVal) ? 0 : ((inputVal - Math.floor(inputVal)) != 0) ? inputVal.toFixed(4) : inputVal.toFixed();
      if ((z - Math.floor(z)) > 0.9998) { z = inputVal.toFixed() }
      return parseFloat(z);
    } else { return 0; }
  }
  //Return proper floating number with 2 fraction number
  static parsePhrmAmount(inputVal: any): any {
    if (inputVal) {
      let z = isNaN(inputVal) ? 0 : ((inputVal - Math.floor(inputVal)) != 0) ? inputVal.toFixed(3) : inputVal.toFixed();
      //changed > 0.9 to 0.98 to accomodate minimal difference in calculation.
      //earlier we were rounding off 0.9 to 1, now we're rounding off >0.985 to 1.. 
      //this gives us better precision..
      if ((z - Math.floor(z)) > 0.998) { z = inputVal.toFixed() }
      return parseFloat(z);
    } else { return 0; }
  }
  //this is to parse final amount of pharmacy sale ang purchase
  static parseFinalAmount(inputVal: any): any {
    if (inputVal) {
      let z = isNaN(inputVal) ? 0 : ((inputVal - Math.floor(inputVal)) != 0) ? inputVal.toFixed(0) : inputVal.toFixed();
      //changed > 0.9 to 0.98 to accomodate minimal difference in calculation.
      //earlier we were rounding off 0.9 to 1, now we're rounding off >0.985 to 1.. 
      //this gives us better precision..
      if ((z - Math.floor(z)) > 0.9) { z = inputVal.toFixed() }
      return parseFloat(z);
    } else { return 0; }
  }
  //Logic for calculation (HAMS)
  //Day count is updated at 00:00.
  //default Checkout Time is 12:00 noon. (it's parameterized)
  //If checkout Time is > 12:00 noon, increment day count by 1.
  //No hourly charge.

  //Scenario 1 (Checkout after checkout time i.e 12:00 noon)
  //Admit: 2019-01-14 11: 00 PM
  //Discharge: 2019-01-15 02: 00 PM
  //Total Days: 2 days

  //Scenario 2 (Checkout before checkout time i.e 12:00 noon)
  //Discharge: 2019-01-15 11: 59 AM
  //Total Days: 1 day
  static calculateADTBedDuration(inDate: number, ipCheckoutDate: any, checkouttimeparameter: string): { days: number, hours: number, checkouttimeparameter: string } { //checkouttimeparameter = "00:00"

    let checkoutDate = ipCheckoutDate;//copying parameter value into local variable.
    //first separate hour and minute from checkoutTimeParameter.
    let chkOutTimeValues: Array<string> = checkouttimeparameter.split(":");//checkouttime paramter comes in HH:mm string format. eg: 13:00
    //expected format of chkOutTimeValues = ["13","00"] -- 0th index is hours and 1st index minutes.
    let chkOutHour = parseInt(chkOutTimeValues[0]);//hour value comes in 0th index.
    let chkOutMinute = chkOutTimeValues.length > 1 ? parseInt(chkOutTimeValues[1]) : 0;//minute value  comes in 2nd position if not default 0 minute.

    if (!checkoutDate)
      checkoutDate = moment(new Date);

    //Checking empty value for minute
    // checkoutDate= moment(checkoutDate).minute() != 0 ? (moment(checkoutDate).minute()) : (moment(chkOutMinute).minute());

    //checkout time is 12 noon. adding 15 minutes margin time
    //if (moment(checkoutDate).hour() >= checkouttimeparameter && moment(checkoutDate).minute() > checkouttimeparameter) {
    if ((moment(checkoutDate).hour() > chkOutHour) || (moment(checkoutDate).hour() == chkOutHour && moment(checkoutDate).minute() > chkOutMinute)) {
      //sud: when checkouttimeparameter is only in hours then we have to take greater than or equals as new day.
      checkoutDate = moment(checkoutDate).set({ hour: chkOutHour, minute: chkOutMinute, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm');
    }
    else {
      checkoutDate = moment(checkoutDate).subtract(1, 'days').set({ hour: chkOutHour, minute: chkOutMinute, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm');

    }
    //'checkinDate' is directly aligned with the 'inDate' and adjusted according to 'checkouttimeparameter' which ensures that the totalDays calculation reflects the actual stay period...
    let checkinDate = moment(inDate).set({ hour: chkOutHour, minute: chkOutMinute, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm');
    //var duration = moment.duration(moment(checkoutDate).diff(moment(checkinDate)));
    //var totalDays = duration.days() + (duration.months() * moment(inDate, 'YYYY-MM').daysInMonth());

    //-- above logic is incorrect if patient stays for more than a month.
    var totalDays = moment(checkoutDate).diff(moment(checkinDate), 'days');

    return { days: totalDays, hours: 0, checkouttimeparameter };
  }


  static findDateTimeDifference(date1: number, date2: number): number {
    return moment(date1).diff(moment(date2));

  }

  // <Extend this function for other special characters if required>
  //this functions encodes the request string so that it is understood by HTTP.
  //for eg: plus '+' character is replaced by '%2B'
  static EncodeRequestDataString(inputString: string): string {
    let retString = '';
    if (inputString) {
      //uses regegular expression to replace + with %2B. Normal string.replace was working only for first occurance.
      retString = inputString.replace(/\+/g, "%2B");
    }
    return retString;
  }

  static GetUniqueItemsFromArray(inputArr: any[]) {
    //var items = [4, 5, 4, 6, 3, 4, 5, 2, 23, 1, 4, 4, 4]
    //below code works only for es6, we might need other solution.
    var uniqueItems = Array.from(new Set(inputArr));
    return uniqueItems;
  }

  static HasDuplicatesInArray(inputArr: any[]) {
    //if unique size of unique array is not equals to input array then it most have duplicate values.
    return (new Set(inputArr)).size !== inputArr.length;
  }

  //concatenate samplecode for pending lab results GRID eg: 171214-1
  //ashim: 09Sep2018 : Sample Code formatting is done in controller.
  //static ConcatenateSampleCode(date, sampleCode) {
  //    let sampleDate = moment(date).format('YYMMDD');
  //    let newsamplecode = sampleDate + "-" + sampleCode;
  //    return newsamplecode
  //}

  //this function will give array of dates between two given dates with day filter option
  static getDateArrayFiltered(obj: {
    startDate: any; // usually a moment.Moment
    endDate: any;
    [key: string]: any; // allows dynamic access like obj["monday"], obj["tuesday"], etc.
  }) {
    let start = obj.startDate.clone();
    let end = obj.endDate.clone();
    let res: Array<{ date: string; day: string; shortDay: string }> = [];

    while (start.isBefore(end)) {
      let day = start.format('dddd').toLowerCase();
      if (obj[day]) {
        // define object type explicitly
        let item: { date: string; day: string; shortDay: string } = {
          date: start.format('YYYY-MM-DD'),
          day: start.format('dddd'),
          shortDay: start.format('ddd')
        };
        res.push(item);
      }
      start.add(1, 'd');
    }
    return res;
  }


  //this function will give array of dates between two given dates without day filter option
  static getDateArray(obj: { startDate: any; endDate: any }) {
    let start = obj.startDate.clone();
    let end = obj.endDate.clone();
    let res: Array<{ date: string; day: string; shortDay: string }> = [];

    while (start.isBefore(end)) {
      const item = {
        date: start.format('YYYY-MM-DD'),
        day: start.format('dddd'),
        shortDay: start.format('ddd')
      };
      res.push(item);
      start.add(1, 'd');
    }

    return res;
  }


  //this function returns the string with its first letter capital (eg: ramAvtar jangid -> RamAvtar jangid)
  static CapitalizeFirstLetter(str: string) {
    let text = "";
    if (str && str.length) {
      text = str.charAt(0).toUpperCase() + str.slice(1);
    }
    return text;
  }
  //--Returns text in between matching delimiters.
  //use regularexpression matching later on.
  static GetTextBetnDelimiters(ipString: string, delimiter1: string, delimiter2: string): string {
    //start and end will be same if only one is passed
    let startDelimiter = delimiter1;
    let endDelimiter = delimiter2 ? delimiter2 : delimiter1;
    let matchingText = null;
    let firstIndex = ipString.indexOf(startDelimiter);
    let lastIndex = ipString.lastIndexOf(endDelimiter);
    let len = lastIndex - firstIndex - 1;
    matchingText = ipString.substr(firstIndex + 1, len);
    return matchingText;
  }
  //this function makes client side Html table to excel file send all details and download excel file
  static ConvertHTMLTableToExcel(table: any, fromDate: string, toDate: string, SheetName: string, TableHeading: string, FileName: string) {
    try {
      if (table) {
        let workSheetName = (SheetName.length > 0) ? SheetName : 'Sheet';
        let PrintDate = '<b>Created Date:' + moment().format('YYYY-MM-DD') + '</b><br />'
        let fromDateNp: any;
        let toDateNp = '';
        if (fromDate.length > 0 && toDate.length > 0) {
          fromDateNp = NepaliCalendarService.ConvertEngToNepaliFormatted_static(fromDate, '');
          toDateNp = NepaliCalendarService.ConvertEngToNepaliFormatted_static(toDate, '');
        }
        let dateRange = (fromDate.length > 0 && toDate.length > 0) ? '<b>Date Range:(AD)' + fromDate + ' To ' + toDate + '</b><br /><b>Date Range: (BS)' + fromDateNp + ' To ' + toDateNp + '</b><br/>' : '';

        let Heading = '<h3>' + TableHeading + '</h3>';
        let filename = (FileName.length > 0) ? FileName : 'Exported_Excel_File';
        filename = filename + '_' + moment().format('YYYYMMMDDhhss') + '.xls';

        let uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{PrintDate}{DateRange}{Heading}{table}</table></body></html>'
          , base64 = function (s: string) { return btoa(decodeURIComponent(encodeURIComponent(s))) }
          , format = function (s: string, c: any): string { return s.replace(/{(\w+)}/g, function (m: string, p: string) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: workSheetName, table: table.innerHTML, PrintDate: PrintDate, DateRange: dateRange, Heading: Heading }
        //return window.location.href = uri + base64(format(template, ctx))             
        var link = document.createElement('a');
        link.href = uri + base64(format(template, ctx));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  static ConvertHTMLTableToExcelForPharmacy(table: any, fromDate: string, toDate: string, SheetName: string, TableHeading: string, FileName: string) {
    try {
      if (table) {
        let workSheetName = (SheetName.length > 0) ? SheetName : 'Sheet';
        let PrintDate = '<b>Created Date:' + moment().format('YYYY-MM-DD') + '</b><br />'
        let fromDateNp: any;
        let toDateNp = '';
        if (fromDate.length > 0 && toDate.length > 0) {
          fromDateNp = '<span style:"text-align: center; float: right;">' + NepaliCalendarService.ConvertEngToNepaliFormatted_static(fromDate, '') + '</span>';
          toDateNp = '<span style:"text-align: center; float: right;">' + NepaliCalendarService.ConvertEngToNepaliFormatted_static(toDate, '') + '</span>';
        }
        let dateRange = (fromDate.length > 0 && toDate.length > 0) ? '<b>Date Range:(AD)' + fromDate + ' To ' + toDate + '</b><br /><b>Date Range: (BS)' + fromDateNp + ' To ' + toDateNp + '</b><br/>' : '';

        let Heading = '<table><tr><td style="text-align: center; font-size:25px" colspan="9">' + TableHeading + '</td></tr></table>'
        // let Heading = '<h3 style="background-color: red; text-align: center;">' + TableHeading + '</h3>';
        let filename = (FileName.length > 0) ? FileName : 'Exported_Excel_File';
        filename = filename + '_' + moment().format('YYYYMMMDDhhss') + '.xls';

        let uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{PrintDate}{DateRange}{Heading}{table}</table></body></html>'
          , base64 = function (s: string) { return btoa(decodeURIComponent(encodeURIComponent(s))) }
          , format = function (s: string, c: any): string { return s.replace(/{(\w+)}/g, function (m: string, p: string) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: workSheetName, table: table.innerHTML, PrintDate: PrintDate, DateRange: dateRange, Heading: Heading }
        //return window.location.href = uri + base64(format(template, ctx))             
        var link = document.createElement('a');
        link.href = uri + base64(format(template, ctx));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  //this function gets json result data and grid column 
  //and return grand total table with as per grid display column header
  //if column name not matche then it's result grand total table with dtabase table column names
  static GrandTotalTable(data: any, gridColList: any[]) {
    try {
      // var grandTotalRow = {};
      var grandTotalRow: { [key: string]: number } = {};
      var col = gridColList;
      if (data.length > 0) {
        var allkeys = Object.keys(data[0]);
        allkeys.forEach(colName => {
          var colVal = data.map((a: any) => a[colName]);
          var Grandtotal = 0;
          for (var i = 0; i < colVal.length; i++) {
            if (!isNaN(colVal[i])) {  //if it's number then add or don't add it into grandtotal
              Grandtotal += Number(colVal[i]);
            }
          }
          grandTotalRow[colName] = Grandtotal;
        });
        data.push(grandTotalRow);

        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < allkeys.length; i++) {
          var th = document.createElement("th");      // TABLE HEADER.
          th.setAttribute("style", "font-weight:bold; ");
          th.innerHTML = CommonFunctions.GetKeyName(allkeys[i], gridColList);// allkeys[i];
          tr.appendChild(th);
        }

        var lastIndex = data.length - 1;
        tr = table.insertRow(-1);
        for (var j = 0; j < allkeys.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[lastIndex][allkeys[j]];
        }
        table.setAttribute("class", "table table-striped table-hover table-responsive");
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class", "table-responsive");
        newdiv.appendChild(table);
        return newdiv;
        // document.body.appendChild(newdiv);
      }
    } catch (exception) {
      console.log(exception);
    }
  }
  static GetKeyName(dbColName: any, gridColNameList: any) {
    try {
      if (gridColNameList) {
        var flag = false;
        for (var i = 0; i < gridColNameList.length; i++) {
          if (gridColNameList[i].field === dbColName) {
            var regX = /(<([^>]+)>)/ig;
            var html = gridColNameList[i].headerName;
            return html.replace(regX, "");
          }
        }
        return dbColName;
      } else {
        return dbColName;
      }
    } catch (exception) {
      console.log(exception);
    }
  }
  //this functrion get json data and return grandtotal json data
  static getGrandTotalData(data: any[]) {
    try {
      const grandTotalRow: { [key: string]: number } = {};
      const res: Array<any> = [];

      if (data.length > 0) {
        const allkeys = Object.keys(data[0]);
        allkeys.forEach(colName => {
          // Fix: Give 'a' a type
          const colVal = data.map((a: any) => a[colName]);

          let Grandtotal = 0;
          for (let i = 0; i < colVal.length; i++) {
            if (!isNaN(colVal[i])) {
              Grandtotal += Number(colVal[i]);
            }
          }
          grandTotalRow[colName] = Grandtotal;
        });
        res.push(grandTotalRow);
        return res;
      }
    } catch (exception) {
      console.log(exception);
    }
    // Add return for all paths
    return [];
  }

  //Sort any array of objects by the provided KeyName.
  //Reusable-Function. Can be called from any class as necessary. <Sundeep:27Nov'19>
  public static SortArrayOfObjects(arrToSort: Array<any>, keyName: string) {
    if (arrToSort && arrToSort.length > 0 && keyName) {
      arrToSort.sort((n1, n2) => {
        if (n1[keyName] > n2[keyName]) {
          return 1;
        }
        if (n1[keyName] < n2[keyName]) {
          return -1;
        }
        return 0;
      });
    }
  }


  //Sort any array of string (CASE-INSENSITIVE)
  // simple  array.sort() doesn't work because of case-sensitivity.
  //Reusable-Function. Can be called from any class as necessary. <Sundeep:27Nov'19>
  public static SortArrayOfString(arrToSort: Array<string>) {
    if (arrToSort && arrToSort.length > 0) {
      //arrToSort.sort();//this doesn't work as expected.
      arrToSort.sort((n1, n2) => {
        //to handle null case, since it'll crash in tolowercase conversion.
        if (!n1 || !n2) {
          return 0;
        }

        if (n1.toLowerCase() > n2.toLowerCase()) {
          return 1;
        }
        if (n1.toLowerCase() < n2.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }

  }


  //Sud: 12Apr'21--To convert Amounts/Currencies etc in words. eg:  10 => TEN, 146=> One Hundred Forty Six, etc..
  //TextTransform options: 'lowercase','uppercase'  
  //To Do 1: Call the same function from NumberInWordsPipe
  //To Do 2: Implement the localization for in-words. eg:100,000 in nepal is called as One Lakhs but as One Hundred Thousand in Other countries and so on.
  //To Do 3: Implement 'capitalize' option in text transform.
  public static GetNumberInWords(ipNumber: any, textTransform: string = "uppercase") {

    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    var inWordStr = toWords(ipNumber);
    inWordStr += " ONLY";

    if (textTransform == "uppercase") {
      inWordStr = inWordStr.toUpperCase();
    }
    else if (textTransform == "lowercase") {
      inWordStr = inWordStr.toLowerCase();
    }
    return inWordStr;

    // Define the word mappings

    function toWords(s: string | number): string {
      s = s.toString();
      s = s.replace(/[\, ]/g, '');

      // Check if it's a valid number
      if (isNaN(Number(s))) return 'not a number';

      const decimalPoint = s.indexOf('.');
      const x = decimalPoint === -1 ? s.length : decimalPoint;

      if (x > 15) return 'too big';

      const digits = s.split('');
      let str = '';
      let sk = 0;

      // Handle negative sign
      if (digits[0] === '-') {
        str += 'minus ';
        digits.shift(); // Remove the minus sign
        // Recalculate x after removing '-'
        const newX = digits.indexOf('.') === -1 ? digits.length : digits.indexOf('.');
        if (newX > 15) return 'too big';
      }

      // Recompute x after possible '-' removal
      const currentX = s.indexOf('.') === -1 ? s.length : s.indexOf('.');
      const start = s.startsWith('-') ? 1 : 0;

      for (let i = start; i < currentX; i++) {
        const digitChar = s[i];
        const digit = parseInt(digitChar, 10);

        if (isNaN(digit)) continue; // skip '.'

        if ((currentX - i) % 3 === 2) {
          if (digitChar === '1') {
            const nextDigit = parseInt(s[i + 1], 10);
            str += tn[nextDigit] + ' ';
            i++;
            sk = 1;
          } else if (digit !== 0) {
            str += tw[digit - 2] + ' ';
            sk = 1;
          }
        } else if (digit !== 0) {
          str += dg[digit] + ' ';
          if ((currentX - i) % 3 === 0) str += 'hundred ';
          sk = 1;
        }

        if ((currentX - i) % 3 === 1) {
          if (sk) {
            const scaleIndex = Math.floor((currentX - i - 1) / 3);
            if (scaleIndex > 0 && scaleIndex <= th.length) {
              str += th[scaleIndex - 1] + ' ';
            }
          }
          sk = 0;
        }
      }

      // Handle decimal part
      if (decimalPoint !== -1) {
        str += 'point ';
        for (let i = decimalPoint + 1; i < s.length; i++) {
          if (s[i] === '-') continue;
          const d = parseInt(s[i], 10);
          str += dg[d] + ' ';
        }
      }

      // Clean up "point zero zero"
      str = str.replace(/point zero zero(?=\s|$)/g, '');
      str = str.replace(/\s+/g, ' ').trim();

      return str || 'zero';
    }

  }

  public static GetSpaceRepeat(nTimes: number) {
    let space1 = ' ';
    return space1.repeat(nTimes);
  }

  public static GetNewLineRepeat(nTimes: number) {
    let nline = '\n';
    return nline.repeat(nTimes);
  }

  public static GetTextCenterAligned(text: string, fullColLength: number) {
    if (text && text.trim().length) {
      let textLen = text.trim().length;
      let mid = Math.floor(textLen / 2);
      let retData = this.GetSpaceRepeat(Math.floor(fullColLength / 2) - mid - 1);
      retData += text + '\n';
      return retData;
    }
    return '\n';
  }

  public static GetTextFilledToALengthForLongString(text: string, totalLength: number) {
    let splittedStringArray = [];
    let retText: string = '';
    let remainingString = text;
    while (remainingString.length > totalLength - 1) {
      splittedStringArray.push(remainingString.substring(0, totalLength - 1));
      remainingString = remainingString.substring(totalLength - 1);
    }
    splittedStringArray.push(remainingString);
    retText = splittedStringArray.join('\n') + this.GetSpaceRepeat(totalLength - (remainingString).length + 1);
    return retText;
  }

  public static GetTextCenterAligned_Sm(text: string, fullColLength: number) {
    if (text && text.trim().length) {
      let textLen = text.trim().length;
      let mid = Math.floor(textLen / 2);
      let retData = ''
      if (Math.floor(fullColLength / 2) - mid - 1 > 0) {
        retData = this.GetSpaceRepeat(Math.floor(fullColLength / 2) - mid - 1);
      }
      if (textLen > fullColLength) {
        let preString = text.substring(0, text.length / 2 - 1)
        let postString = text.substring(text.length / 2, text.length)
        retData += this.GetTextCenterAligned_Sm(preString, fullColLength) + '\n';
        retData += this.GetTextCenterAligned_Sm(postString, fullColLength);
      }
      else {
        retData += text;
      }
      retData;
      return retData;
    }
    return '\n';
  }

  //Krishna,8thn'22 , Need to create this function inorder to handle long itemNames with doctor names in provisional slip
  public static GettextFilledToALengthForLongItemNames(text: string, totalLength: number, spaceToLeave: number) {
    let strLen = text.trim().length;
    let space1 = ' ';
    let retText = '';
    if (totalLength >= strLen) {
      retText = text + space1.repeat(totalLength - strLen);
    } else {
      // Below logic is needed for length itemNames that is needed to break line with dynamic spacing.. , Krishna
      for (let i = 0; i < strLen; i = i + totalLength) {
        if (strLen - i > totalLength) {
          retText += (text.substring(i, totalLength + i - 1) + '\n' + this.GetSpaceRepeat(spaceToLeave));
        } else {
          retText += text.substring(i) + this.GetSpaceRepeat(totalLength - text.substring(i).length);
        }
      }
    }
    return retText;
  }

  public static GetTextFIlledToALength(text: string, totalLength: number) {
    let strLen = text.trim().length;
    let space1 = ' ';
    let retText = '';
    if (totalLength >= strLen) {
      retText = text + space1.repeat(totalLength - strLen);
    } else {
      retText = text.substring(0, totalLength - 1) + '\n' + text.substring(totalLength - 1) + this.GetSpaceRepeat(totalLength - (strLen - totalLength));
    }
    return retText;
  }
  public static GetTextFIlledToALength_Sm(text: string, totalLength: number) {
    let strLen = text.trim().length;
    let space1 = ' ';
    let retText = '';
    if (totalLength >= strLen) {
      retText = text + space1.repeat(totalLength - strLen);
    } else {
      retText = text.substring(0, totalLength - 1) + '\n' + text.substring(totalLength - 1) + this.GetSpaceRepeat(totalLength - (strLen - totalLength));
    }
    return retText;
  }
  public static GetTextFilledToALength_SpaceBetween_Sm(leftText: string, rightText: string, totalLength: any) {
    let retText = '';
    retText += leftText;
    retText += this.GetSpaceRepeat(totalLength - leftText.length - rightText.length);
    retText += rightText;
    return retText;
  }
  public static GetTextFIlledToALengthWithLeftMargin_Sm(text: string, totalLength: number, leftMarginLength: number) {
    let strLen = text.trim().length;
    let space1 = ' ';
    let retText = '';
    if (totalLength >= strLen) {
      retText = this.GetSpaceRepeat(leftMarginLength) + text + space1.repeat(totalLength - strLen);
    } else {
      var noOfLinesToBePrinted = Math.ceil(strLen / totalLength);
      for (var i = 0; i < noOfLinesToBePrinted; i++) {
        if (i < noOfLinesToBePrinted - 1)
          retText += text.substring((totalLength * i), (totalLength * (i + 1))) + "\n" + this.GetSpaceRepeat(leftMarginLength);
        else
          retText += text.substring((totalLength * i), strLen + 1) + this.GetSpaceRepeat(totalLength - (strLen - (totalLength * i) - 1))
      }
    }
    return retText;
  }
  public static GetPHRMTextFIlledToALengthForParticulars(text: string, totalLength: number, leftMarginLength: number) {
    let strLen = text.trim().length;
    let space1 = ' ';
    let retText = '';
    if (totalLength >= strLen) {
      retText = text + space1.repeat(totalLength - strLen);
    } else {
      var noOfLinesToBePrinted = Math.ceil(strLen / totalLength);
      for (var i = 0; i < noOfLinesToBePrinted; i++) {
        if (i < noOfLinesToBePrinted - 1)
          retText += text.substring((totalLength * i), (totalLength * (i + 1))) + "\n" + this.GetSpaceRepeat(leftMarginLength);
        else
          retText += text.substring((totalLength * i), strLen + 1) + this.GetSpaceRepeat(totalLength - (strLen - (totalLength * i) - 1))
      }
    }
    return retText;
  }

  public static GetHorizontalLineOfLength(nTimes: number) {
    let sp = '-';
    return sp.repeat(nTimes);
  }

  public static GetEpsonHexCommandForNumber(num: number) {
    return String.fromCharCode(num);
  }




  //since invoice and sticker has different margin settings, we're parameterizing that with printouttype.
  //possible values for printouttypes are 'billing-invoice','reg-sticker','phrm-invoice'
  public static GetEpsonPrintDataForPage(data: any, mh: number, ml: number, modelName: string = "LQ-310", printOutType: string = "billing-invoice") {
    let mhData = String.fromCharCode(mh);
    let mlData = String.fromCharCode(ml);

    if (modelName.trim() == "") {
      modelName = "LQ-310";
    }

    if (printOutType == "billing-invoice") {
      //below is for Billing-Invoice's Font size..  10 CharacterPerInch
      if (modelName == "LX-310") {
        return [
          '\x1B' + '\x40',
          '\x1B' + '\x33' + '\x1B', //ESC 3  set LineSpacing
          '\x1B' + '\x43' + '\x2A', //ESC C  set pagelength in Line
          data,
          '\x0C'];
      } else {
        return [
          '\x1B' + '\x40',
          '\x1B' + '\x28' + '\x55' + '\x01' + '\x00' + '\x0A',//Set Unit>  'ESC ( U nL nH m'
          '\x1B' + '\x28' + '\x43' + '\x02' + '\x00' + mlData + mhData, //'ESC ( C nL nH mL mH'  set page length in defined unit
          data,
          '\x0C'];
      }
    }
    else if (printOutType == 'phrm-invoice') {
      if (modelName == "LX-310") {
        return [
          '\x1B' + '\x40',
          '\x1B' + '\x33' + '\x1B', //ESC 3  set LineSpacing
          '\x1B' + '\x43' + '\x2A', //ESC C  set pagelength in Line
          data,
          '\x0C'];
      }
      else {
        //below is for Pharmacy-Invoice's Font size..  15 CharacterPerInch (CPI)
        return [
          '\x1B' + '\x40',
          '\x1B' + '\x28' + '\x55' + '\x01' + '\x00' + '\x0A',//Set Unit>  'ESC ( U nL nH m'
          '\x1B' + '\x67',  //'ESC M'   => Change Font size 15-CPI
          '\x1B' + '\x28' + '\x43' + '\x02' + '\x00' + mlData + mhData, //'ESC ( C nL nH mL mH'  set page length in defined unit
          data,
          '\x0C'];
      }
    }
    else if (printOutType == "reg-sticker") {
      if (modelName == "LX-310") {
        return [
          '\x1B' + '\x40',
          '\x1B' + '\x6C' + '\x00',
          '\x1B' + '\x4D',
          '\x1B' + '\x33' + '\x1B', //ESC 3  set LineSpacing
          '\x1B' + '\x43' + '\x0C', //ESC C  set pagelength in Line
          data,
          '\x0C'];
      }
      else {
        //for 12CPI - 5Characters left margin - Paper size: 3.8cm = 1.49606 inch, mH=2, mL=25
        return [
          '\x1B' + '\x40',
          '\x1B' + '\x28' + '\x55' + '\x01' + '\x00' + '\x0A',   //Set Unit>  'ESC ( U nL nH m'
          '\x1B' + '\x4D',  //'ESC M'   => Select 10.5-point, 12-CPI
          '\x1B' + '\x6C' + '\x05',//'ESC l 5' => 5 character margin on the left.
          '\x1B' + '\x28' + '\x63' + '\x01' + '\x00' + '\x00' + '\x00' + '\x00' + '\x00', //'ESC ( c nL nH tL tH bL bH' command    //set page format
          '\x1B' + '\x28' + '\x43' + '\x02' + '\x00' + mlData + mhData, //'ESC ( C nL nH mL mH'  set page length in defined unit
          data,
          '\x0C'];
      }
    }

  }

  public static GetReceiptDotMatrixPrintDataForPage(data: any, settings: PrinterSettingsModel) {

    if (settings.FooterGap_Lines) {
      let nline = '\n';
      let footerGap = nline.repeat(settings.FooterGap_Lines);
      data = data + footerGap;
    }

    return [data]

  }


  //this function makes client side Html table to excel file send all details and download excel file
  static ConvertHTMLTableToExcelForBilling(table: any, fromDate: string, toDate: string, SheetName: string, TableHeading: string, FileName: string, hospitalName: string, hospitalAddress: string, phoneNumber: any, showHeader: boolean, showDateRange: boolean) {
    try {
      if (table) {
        //gets tables wrapped by a div.
        var _div = document.getElementById(table)!.getElementsByTagName("table");
        var colCount = [];

        //pushes the number of columns of multiple table into colCount array.
        for (let i = 0; i < _div.length; i++) {
          var col = _div[i].rows[1].cells.length;
          colCount.push(col);
        }

        //get the maximum element from the colCount array.
        var maxCol = colCount.reduce(function (a, b) {
          return Math.max(a, b);
        }, 0);

        //define colspan for td.
        var span = "colspan= " + Math.trunc(maxCol / 3);

        var phone;
        if (phoneNumber != null) {
          phone = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><strong> Phone:' + phoneNumber + '</strong></td><td ' + span + '></td></tr><br>';
        } else {
          phone = "";
        }

        var hospName;
        var address;
        if (showHeader == true) {
          hospName = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><strong>' + hospitalName + '</strong></td><td ' + span + '></td></tr><br>';
          address = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><strong>' + hospitalAddress + '</strong></td><td ' + span + '></tr><br>';
        } else {
          hospName = "";
          address = "";
        }
        let workSheetName = (SheetName.length > 0) ? SheetName : 'Sheet';
        let fromDateNp: any;
        let toDateNp = '';
        if (fromDate.length > 0 && toDate.length > 0) {
          fromDateNp = NepaliCalendarService.ConvertEngToNepaliFormatted_static(fromDate, '');
          toDateNp = NepaliCalendarService.ConvertEngToNepaliFormatted_static(toDate, '');
        }

        //let Heading = '<tr><td></td><td></td><td></td><td></td><td colspan="4" style="text-align:center;font-size:medium;"><h>' + TableHeading + '</h></td><td></td><td></td><td></td><td></td><td></td></tr>';
        let Heading = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><h>' + TableHeading + '</h></td><td ' + span + '></td></tr>';
        var dateRange;
        if (showDateRange == true) {
          dateRange = (fromDate.length > 0 && toDate.length > 0) ? '<tr><td></td><td><b>Date Range:(AD)' + fromDate + ' To ' + toDate + '</b></td></tr><br /><tr><td></td><td><b>Date Range: (BS)' + fromDateNp + ' To ' + toDateNp + '</b></td></tr><br/>' : '';

        } else {
          dateRange = "";
        }
        let PrintDate = '<tr><td></td><td><b>Created Date:' + moment().format('YYYY-MM-DD') + '</b></td></tr><br />'

        let filename = (FileName.length > 0) ? FileName : 'Exported_Excel_File';
        filename = filename + '_' + moment().format('YYYYMMMDDhhss') + '.xls';

        let uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><tr>{hospitalName}{hospitalAddress}{phone}{Heading}{DateRange}{PrintDate}</tr>{table}</table></body></html>'
          //, base64 = function (s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
          , base64 = function (s: string) { return btoa(decodeURIComponent(encodeURIComponent(s))) }
          , format = function (s: string, c: any): string { return s.replace(/{(\w+)}/g, function (m: string, p: string) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: workSheetName, table: table.innerHTML, PrintDate: PrintDate, hospitalName: hospName, hospitalAddress: address, phone: phone, DateRange: dateRange, Heading: Heading }
        //return window.location.href = uri + base64(format(template, ctx))             
        var link = document.createElement('a');
        link.href = uri + base64(format(template, ctx));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  // TO export Medical Record's Reports To Excel
  static ConvertHTMLTableToExcelForMedicalRecord(table: any, dateRange: string, SheetName: string, TableHeading: string, FileName: string, hospitalName: string, hospitalAddress: string, phoneNumber: any) {
    try {
      if (table) {
        var _div = document.getElementById(table)!.getElementsByTagName("table");
        var colCount = [];

        for (let i = 0; i < _div.length; i++) {
          var col = _div[i].rows[1].cells.length;
          colCount.push(col);
        }
        var maxCol = colCount.reduce(function (a, b) {
          return Math.max(a, b);
        }, 0);

        var span = "colspan= " + Math.trunc(maxCol / 3);

        var phone;
        if (phoneNumber != null) {
          phone = '<tr><td ' + span + '></td><td colspan="5" style="text-align:center;font-size:medium;"> Phone:' + phoneNumber + '</td><td ' + span + '></td></tr><br>';
        } else {
          phone = "";
        }

        var hospName;
        var address;
        hospName = '<tr><td ' + span + '></td><td colspan="5" style="text-align:center;font-size:medium;"><strong>' + hospitalName + '</strong></td><td ' + span + '></td></tr><br>';
        address = '<tr><td ' + span + '></td><td colspan="5" style="text-align:center;font-size:medium;"><strong>' + hospitalAddress + '</strong></td><td ' + span + '></tr><br>';
        let workSheetName = (SheetName.length > 0) ? SheetName : 'Sheet';

        var Heading;
        if (TableHeading) {
          Heading = '<tr><td ' + span + '></td><td colspan="5" style="text-align:center;font-size:medium;"><h>' + TableHeading + '</h></td><td ' + span + '></td></tr>';
        }

        let filename = (FileName.length > 0) ? FileName : 'Exported_Excel_File';
        filename = filename + '_' + moment().format('YYYYMMMDDhhss') + '.xls';

        let uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><tr>{hospitalName}{hospitalAddress}{phone}{Heading}{DateRange}</tr>{table}</table></body></html>'
          , base64 = function (s: string) { return btoa(decodeURIComponent(encodeURIComponent(s))) }
          , format = function (s: string, c: any): string { return s.replace(/{(\w+)}/g, function (m: string, p: string) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: workSheetName, hospitalName: hospName, table: table.innerHTML, hospitalAddress: address, phone: phone, DateRange: dateRange, Heading: Heading }
        //return window.location.href = uri + base64(format(template, ctx))             
        var link = document.createElement('a');
        link.href = uri + base64(format(template, ctx));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  static ConvertHTMLMultipleTableToExcelForMR(table: any, dateRange: any, SheetName: string, ExportedBy: string, TableHeading: string, FileName: string, hospitalName: string, hospitalAddress: string, phoneNumber: any) {
    try {
      if (table) {
        var _div = document.getElementById(table)!.getElementsByTagName("table");
        var colCount = [];
        var span = "colspan= " + Math.trunc(_div.length / 3);
        var phone;
        if (phoneNumber != null) {
          phone = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"> Phone:' + phoneNumber + '</td><td ' + span + '></td></tr><br>';
        } else {
          phone = "";
        }
        var hospName;
        var address;
        hospName = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><strong>' + hospitalName + '</strong></td><td ' + span + '></td></tr><br>';
        address = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><strong>' + hospitalAddress + '</strong></td><td ' + span + '></tr><br>';
        let workSheetName = (SheetName.length > 0) ? SheetName : 'Sheet';
        let Heading = '<tr><td ' + span + '></td><td colspan="4" style="text-align:center;font-size:medium;"><h>' + TableHeading + '</h></td><td ' + span + '></td></tr>';
        // let PrintDate = '<tr><td></td><td><b>Created Date:' + moment().format('YYYY-MM-DD') + '</b></td></tr><br />'
        let filename = (FileName.length > 0) ? FileName : 'Exported_Excel_File';
        filename = filename + '_' + moment().format('YYYYMMMDDhhss') + '.xls';
        let uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><tr>{hospitalName}{hospitalAddress}{phone}{Heading}{DateRange}</tr>{table}</table></body></html>'
          , base64 = function (s: string) { return btoa(decodeURIComponent(encodeURIComponent(s))) }
          , format = function (s: string, c: any): string { return s.replace(/{(\w+)}/g, function (m: string, p: string) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: workSheetName, table: table.innerHTML, hospitalName: hospName, hospitalAddress: address, phone: phone, DateRange: dateRange, Heading: Heading }
        //return window.location.href = uri + base64(format(template, ctx))             
        var link = document.createElement('a');
        link.href = uri + base64(format(template, ctx));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  static ConvertHTMLTableToExcelForAccounting(table: any, SheetName: string, date: string, TableHeading: string, filename: string, hospitalName: string, hospitalAddress: string, printByMessage: string, showPrintBy: boolean, showHeader: boolean, showDateRange: boolean, printBy: string, ShowFooter: boolean, Footer: string) {
    try {
      var printDate = moment().format("YYYY-MM-DD HH:mm");
      if (table) {
        var _div = document.getElementById(table)!.getElementsByTagName("table");
        var colCount = [];
        for (let i = 0; i < _div.length; i++) {
          var col = _div[i].rows[1].cells.length;
          colCount.push(col);
        }
        var maxCol = colCount.reduce(function (a, b) {
          return Math.max(a, b);
        }, 0);
        var span = "colspan= " + Math.trunc(maxCol / 3);
        var hospName;
        var address;
        if (showHeader == true) {
          var Header = `<tr><td></td><td></td><td colspan="4" style="text-align:center;font-size:large;"><strong>${hospitalName}</strong></td></tr><br/>
          <tr> <td></td><td></td><td colspan="4" style="text-align:center;font-size:small;"><strong>${hospitalAddress}</strong></td></tr><br/>
          <tr> <td></td><td></td><td colspan="4" style="text-align:center;font-size:small;width:600px;"><strong>${TableHeading}</strong></td></tr><br/>
          <tr> <td style="text-align:center;"><strong>${date}</strong></td><td></td><td></td><td></td><td></td><td style="text-align:center;"><strong>${printByMessage}${printBy}</strong></td><td><strong>Exported On: ${printDate}</strong></td></tr><br>`
        }
        else {

          if (date == "") { //if showdate date is false
            Header = `<tr> <td style="text-align:center;"><strong> ${printByMessage} ${printBy} </strong></td><td><strong>Exported On: ${printDate}</strong></td></tr>`;
          }
          else if (printBy == "") { // if  printby is false. 
            Header = `<tr> <td style="text-align:center;"><strong>${date}</strong></td><td><strong>Exported On: ${printDate}</strong></td></tr>`;
          }
          else { //if both are true
            Header = `<tr> <td style="text-align:center;"><strong>${date}</strong></td><td></td><td></td><td></td><td style="text-align:center;"><strong>${printByMessage}${printBy}</strong></td><td><strong>Exported On: ${printDate}</strong></td></tr><br>`;
          }
        }
        let workSheetName = (SheetName.length > 0) ? SheetName : 'Sheet';

        if (ShowFooter == true) {
          Footer = "";
        } else {
          Footer = '';
        }
        let uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><tr>{Header}</tr>{table}</table></body></html>'
          , base64 = function (s: string) { return btoa(decodeURIComponent(encodeURIComponent(s))) }
          , format = function (s: string, c: any): string { return s.replace(/{(\w+)}/g, function (m: string, p: string) { return c[p]; }) }
        if (!table.nodeType) table = document.getElementById(table)

        // Collect only visible rows from the table
        let visibleRowsHTML = '';
        const rows = table.querySelectorAll('tr');
        rows.forEach((row: HTMLTableRowElement) => {
          if (this.HasContent(row)) {
            visibleRowsHTML += row.outerHTML;
          }
        });
        let ctx = {
          worksheet: workSheetName,
          table: visibleRowsHTML,
          Header: Header,
          footer: Footer
        };

        var link = document.createElement('a');
        link.href = uri + base64(format(template, ctx));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  public static SplitStringAndReturnFirstTwoWord(str: string) {
    let text = "";
    if (str && str.length) {
      let splittedString = str.split(' ');
      text = splittedString[0] + splittedString[1];
    }
    return text;
  }

  public static HasContent(row: HTMLTableRowElement) {
    return Array.from(row.cells).some(cell => cell.textContent.trim().length > 0);
  }
}
