import { Injectable } from "@angular/core";
import { CoreBLService } from "./core-bl.service";
import { MessageboxService } from "../../messagebox/messagebox.service";
import { CFGParameterModel } from "../../models/cfg-parameter.model";
import { PrinterSettingsModel } from "../../../setting/printers/select-printer/printer-settings.model";
import * as qz from 'qz-tray';
import { stob64, hextorstr, KEYUTIL, KJUR } from 'jsrsasign';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public showCalendarADBSButton: boolean = true;
  public showLocalNameFormControl: boolean = true;
  public showCountryMapOnLandingPage: boolean = true;
  public Parameters: Array<CFGParameterModel> = [];
  public DatePreference: string = "np";
  public CustomLabels: { [moduleName: string]: { [key: string]: string; }; } = {};
  public AllPrinterSettings: Array<PrinterSettingsModel> = [];
  QzTrayObject: any;

  constructor(
    public coreBlService: CoreBLService,
    public msgBoxServ: MessageboxService
  ) { }

  public InitializeParameters() {
    return this.coreBlService.GetParametersList();
  }
  public SetCalendarADBSButton() {
    var calParameter = this.Parameters.find(
      (a) => a.ParameterName == "ShowCalendarADBSButton"
    );
    if (calParameter)
      this.showCalendarADBSButton = JSON.parse(calParameter.ParameterValue);
    else
      this.msgBoxServ.showMessage("error", [
        "Please set showCalendarADBSButton in parameters.",
      ]);
  }
  public getCalenderDatePreference() {
    return this.coreBlService.getCalenderDatePreference();
  }
  public SetCalenderDatePreference(res: any) {
    if (res.Status == "OK") {
      let data = res.Results;
      this.DatePreference = data != null ? data.PreferenceValue : "np";
      if (
        this.DatePreference == "" &&
        this.Parameters &&
        this.Parameters.length > 0
      ) {
        let param = this.Parameters.find(
          (p) =>
            p.ParameterName == "CalendarDatePreference" &&
            p.ParameterGroupName.toLowerCase() == "common"
        );
        if (param) {
          let paramValueObj = JSON.parse(param.ParameterValue);
          if (paramValueObj != null) {
            if (paramValueObj.np) {
              this.DatePreference = "np";
            } else {
              this.DatePreference = "en";
            }
          }
        }
      }
    }
  }
  public FocusInputById(targetId: string, waitTimeInMs: number = 100) {
    let timer = window.setTimeout(function () {
      let htmlObject: any = document.getElementById(targetId);
      if (htmlObject) {
        htmlObject.focus();
        let elemType = htmlObject.type;
        if (
          elemType == "text" ||
          elemType == "number" ||
          elemType == "tel" ||
          elemType == "password"
        ) {
          htmlObject.select();
        }
      }
      clearTimeout(timer);
    }, waitTimeInMs);
  }
  public GetInvoiceDisplaySettings() {
    var StrParam = this.Parameters.find(
      (a) =>
        a.ParameterGroupName == "Billing" &&
        a.ParameterName == "InvoiceDisplaySettings"
    );
    if (StrParam && StrParam.ParameterValue) {
      let currParam = JSON.parse(StrParam.ParameterValue);
      return currParam;
    }
  }

  GetModuleLabels(moduleName: string): any {
    return this.CustomLabels[moduleName] || {};
  }
  public GetInvoiceQRConfig(printType: string): boolean {
    // Define type of parameter item structure
    interface InvoiceQRParam {
      PrintType: string;
      ShowQR: boolean;
    }

    let StrParam = this.Parameters.find(
      (a: any) =>
        a.ParameterGroupName === "Common" &&
        a.ParameterName === "InvoiceQRConfig"
    );

    if (StrParam && StrParam.ParameterValue) {
      // Explicitly tell TypeScript what type we expect from JSON
      let currParam: InvoiceQRParam[] = JSON.parse(StrParam.ParameterValue);

      if (currParam && currParam.length > 0) {
        let result = currParam.find((a: InvoiceQRParam) => a.PrintType === printType);
        return !!(result && result.ShowQR);
      }
    }

    // default return value if nothing found
    return false;
  }
  CalculateAge(dateOfBirth: string): string {
    const today = new Date();

    // Convert the dateOfBirth string to a Date object
    const dob = new Date(dateOfBirth);

    // Calculate the differences
    const years = today.getFullYear() - dob.getFullYear();
    const months = today.getMonth() - dob.getMonth();
    const days = today.getDate() - dob.getDate();

    let yearsDiff = years;
    let monthsDiff = months;
    let daysDiff = days;

    // Adjust for cases where the current month/day is earlier than the birth month/day
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      monthsDiff += 12;
    }

    if (daysDiff < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
      daysDiff += lastMonth.getDate();
      monthsDiff--;
    }

    // Construct age string based on conditions
    if (yearsDiff > 1) {
      return `${yearsDiff}Y`; // Show years in the format "XY"
    } else if (yearsDiff === 1) {
      return `1Y`; // Show "1Y" for exactly one year
    } else {
      // Less than one year; return the month and day format
      return monthsDiff > 0 || daysDiff > 0 ? `${monthsDiff}M-${daysDiff}D` : '0D'; // Show in format "XM-XD" or "0D"
    }
  }
  FormateAgeSex(age: string, gender: string): string {
    if (age && gender) {
      let agesex = age + '/' + gender.charAt(0).toUpperCase();
      return agesex;
    }
    else
      return '';
  }
  public SetQZTrayObject() {
    //Alternate method 2 - direct
    this.QzTrayObject = qz;
    this.QzTrayObject.security.setCertificatePromise(function (
      resolve: any,
      reject: any
    ) {
      resolve(
        "-----BEGIN CERTIFICATE-----\n" +
        "MIID/zCCAuegAwIBAgIUHLAudnma7zysXlSYT2CMFZS5kkYwDQYJKoZIhvcNAQEL\n" +
        "BQAwgY0xCzAJBgNVBAYTAklOMRQwEgYDVQQIDAtNQUhBUkFTSFRSQTEPMA0GA1UE\n" +
        "BwwGTVVNQkFJMRQwEgYDVQQKDAtURVNUQ09NUEFOWTELMAkGA1UECwwCSVQxDDAK\n" +
        "BgNVBAMMA05CQjEmMCQGCSqGSIb3DQEJARYXc3VwcG9ydEB0ZXN0Y29tcGFueS5j\n" +
        "b20wIBcNMjEwNDA4MTAxODU1WhgPMjA1MjEwMDExMDE4NTVaMIGNMQswCQYDVQQG\n" +
        "EwJJTjEUMBIGA1UECAwLTUFIQVJBU0hUUkExDzANBgNVBAcMBk1VTUJBSTEUMBIG\n" +
        "A1UECgwLVEVTVENPTVBBTlkxCzAJBgNVBAsMAklUMQwwCgYDVQQDDANOQkIxJjAk\n" +
        "BgkqhkiG9w0BCQEWF3N1cHBvcnRAdGVzdGNvbXBhbnkuY29tMIIBIjANBgkqhkiG\n" +
        "9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsS1DLcb43EHRGbih1jy8j5wShq9yNrOntM+0\n" +
        "1jjKecSjI6y0FezpILFOFBf5sdE3oOs/lJt7Ff46cAgTIAJw2d3izj/oHpoz6rwx\n" +
        "qfr1bYg9g/fLREpwfmntJ2F7S3jmQbFtM7Sfrrfvr0CKxIBzo4fn8JRoy9hmBql7\n" +
        "2jNUlFeVtF9ybThqN0g8tL2GqdtVtx5KSSQSf9r/9xDck/eys6AUTM1LVcdUUnMj\n" +
        "F+RpQVX305YwWq56/HBQkOYm37IEBcQAunag6t6mQLHZeOz/TVs86Vqo0oIQ2TKe\n" +
        "/Hqekhq3Ms4bRTxxzMv8kl0aZ1OoaaU0JlKFvKlQQX6tV/IiBQIDAQABo1MwUTAd\n" +
        "BgNVHQ4EFgQUNRcOZDPjkDwTqywU4STm+jBRu24wHwYDVR0jBBgwFoAUNRcOZDPj\n" +
        "kDwTqywU4STm+jBRu24wDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOC\n" +
        "AQEADmP9auCyaGNHtajFsvlWQ+J+35YswO4nLaYnWyeCIVIqRJmAoVmdUoE5ZozG\n" +
        "qgyd7+qxw3hHqUNjRM+MZ3CdiKObsga0LTgVh4l0hePt1ASfrk6xpRTGGeNAayCy\n" +
        "RaRzhqRyTKmVEF1Q0aL5vEuU53VXVLJVwC3rlVcfMOADkhgi880w5sQyI+KB62Lo\n" +
        "vnGwZlq2MlfloLt0SR5ibkQw+GEac/9e+ttyRtIZral+hqJxlKnJXpmNQN3FUrhH\n" +
        "rT2yb8HlWzUfdhV5qB8ZDvC8NbzSzOULE//juouAUOAm78e+/1LQDTbYsh3oeHwF\n" +
        "ewTnjiY2eE/gY695iRMfZGjm/g==\n" +
        "-----END CERTIFICATE-----\n"
      );
    });
    var privateKey =
      "-----BEGIN PRIVATE KEY-----\n" +
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxLUMtxvjcQdEZ\n" +
      "uKHWPLyPnBKGr3I2s6e0z7TWOMp5xKMjrLQV7OkgsU4UF/mx0Teg6z+Um3sV/jpw\n" +
      "CBMgAnDZ3eLOP+gemjPqvDGp+vVtiD2D98tESnB+ae0nYXtLeOZBsW0ztJ+ut++v\n" +
      "QIrEgHOjh+fwlGjL2GYGqXvaM1SUV5W0X3JtOGo3SDy0vYap21W3HkpJJBJ/2v/3\n" +
      "ENyT97KzoBRMzUtVx1RScyMX5GlBVffTljBarnr8cFCQ5ibfsgQFxAC6dqDq3qZA\n" +
      "sdl47P9NWzzpWqjSghDZMp78ep6SGrcyzhtFPHHMy/ySXRpnU6hppTQmUoW8qVBB\n" +
      "fq1X8iIFAgMBAAECggEAedkF/WJ8XYXKFyVZ72tfxmfweb4JD0Ooj3nVBQqTfQDV\n" +
      "rUAlrXp7raciakE+0KJw3nNLC5mOIcbwS4HSHU5wa/Tj+TIMIZetIr8AbMURqp1q\n" +
      "qOpuWW3URav1lAK/d10TBZTO5CNROih3ZxA9Hvy0Cn/57AM0uxP8vpIqghqRDV60\n" +
      "/bQaZ0N7lFhQIojON0nBQ9EH2z8iZLxHgNELLrxV51VLWsEhkQtCXw7zvavoYxw2\n" +
      "zmDa0qHjPe4mhw1Bfl8aKr7eluKY08dDX+k2UfgUWTFOp591Aq1rPCyK1EOwXyt4\n" +
      "nz883BKEgIO+/nzZH5R7NP2UMOhvmEL4lTyQFgDYwQKBgQDk22fkmRLMUUgE2zH+\n" +
      "oqlAXoq+uXgokrT2gKVXn8cj/NoS9X6E6tw/L9FKpWgWd9whhKAj98nOtbv5lFJi\n" +
      "FNMz8z86rJfdIaZMlhrsdiNuK+yzRkKqDfG3Nb4LOK/0F2TYrjCV/WyfRKNZiv1d\n" +
      "gH5rFLhNeTi1pwc553ZCqfN8EQKBgQDGMLuSyQJeOMT07gQOHopRYqDN0OTp9Jux\n" +
      "/zCFnqK7U3QADp5yEdozD56hvYOH59TrwhbpSv5nW2N18OrlTQFmherirrI90S7Q\n" +
      "EydXo54wAJYzkc2rdDI2JxJpN7LxZN87S6nZ5INffBlNxwbn8oqii5zqUeZ96LaM\n" +
      "G1TSPobKtQKBgQCpLaSEsb/auG9z35H6ucZCZmFMkpDH9YO/AeS4fM3axa1z/HTV\n" +
      "z0SXlUKzWskyatKZGJDFZgSSQXg/DK1GAj0LF1NzjWkKODjWPtSSXtbcN65X7KWV\n" +
      "To+ULy9Y3kP8Plr3bvVNu7TTnArhQ8T+nOFXSU7hPq50YpAN9xROPZJX8QKBgGna\n" +
      "P2S/nVcrpO5YbawI3cFoFxC2QH1AWyPvcz/6oVnB0dPx+uhb5pmc/xHNwYGF7e/Z\n" +
      "YxlJJ6WWZwHoId1EirnyTqixu5tOrV0OzdV+Gw/yUEbM2fd4ARVxOuEdkaJiSORH\n" +
      "njk1VoFaK72hzmt13FvCi5WPFrcq4szkECKWqLF9AoGABWVfGh8dFTkq6F4I+TlI\n" +
      "nRnnYg0H5rXc+rOaiz6+ccAlpFc8PhkZfcfyiPg9WgbRo+za+pbCP/AvZMdCFJ7r\n" +
      "ls/piOCFCmqNPc1FnEB7M7pZVhS0ayWuLNy1zRzz4bXZNiYb1StAmmZmzTkkTNQv\n" +
      "yBStj7Ka0FRa+Q7X+utUJ3I=\n" +
      "-----END PRIVATE KEY-----\n";

    this.QzTrayObject.security.setSignatureAlgorithm("SHA512"); // Since 2.1
    this.QzTrayObject.security.setSignaturePromise(function (toSign: any) {
      return function (resolve: any, reject: any) {
        try {
          var pk = KEYUTIL.getKey(privateKey);
          var sig = new KJUR.crypto.Signature({ alg: "SHA512withRSA" }); // Use "SHA1withRSA" for QZ Tray 2.0 and older
          //var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
          sig.init(pk);
          sig.updateString(toSign);
          var hex = sig.sign();
          resolve(stob64(hextorstr(hex)));
        } catch (err) {
          console.error(err);
          reject(err);
        }
      };
    });
  }
  public GetPharmacyInvoiceDisplaySettings() {
    let StrParam = this.Parameters.find(
      (a) =>
        a.ParameterGroupName == "Pharmacy" &&
        a.ParameterName == "PharmacyInvoiceDisplaySettings"
    );
    if (StrParam && StrParam.ParameterValue) {
      let currParam = JSON.parse(StrParam.ParameterValue);
      return currParam;
    }
  }

  public GetPharmacyInvoiceQRConfig(printType: string): boolean {
    const strParam = this.Parameters.find(a => a.ParameterGroupName === "Pharmacy" && a.ParameterName === "PharmacyInvoiceQRConfig");

    if (strParam && strParam.ParameterValue) {
      const currParam = JSON.parse(strParam.ParameterValue);
      if (currParam && currParam.length > 0) {
        const result = currParam.find((a: any) => a.PrintType === printType);
        if (result && result.ShowQR) {
          return true;
        }
      }
    }
    return false;
  }

}