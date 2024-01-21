import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-inputfield',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inputfield.component.html',
  styleUrl: './inputfield.component.scss'
})
export class InputfieldComponent implements OnInit {
  @Input() value: string | undefined;
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Enter Text here';
  @Input() id: string = '';
  @Input() svgType: string = '';
  @Output() getValue = new EventEmitter<string>()
  // @ts-ignore
  svg:SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    switch (this.svgType){
      case 'name':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg fill=\"currentColor\" viewBox=\"0 0 16 16\" height=\"1em\" width=\"1em\"><path d=\"M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z\"></path></svg>");
        break;
      case 'password':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 1024 1024\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1156 0zm152-237H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224z\"></path></svg>");
        break;
      case 'address':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 576 512\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1-1.4.1-2.8.1-4.2.1H392c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.6H32c-18 0-32-14-32-32.1 0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24z\"></path></svg>");
        break;
      case 'phone':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg fill=\"currentColor\" viewBox=\"0 0 16 16\" height=\"1em\" width=\"1em\"><path fill-rule=\"evenodd\" d=\"M1.885.511a1.745 1.745 0 012.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z\"></path></svg>");
        break;
      case 'date':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z\"></path><path d=\"M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z\"></path></svg>");
        break;
      case 'email':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z\"></path></svg>");
        break;
      case 'vehiclename':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 1024 1024\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M959 413.4L935.3 372a8 8 0 00-10.9-2.9l-50.7 29.6-78.3-216.2a63.9 63.9 0 00-60.9-44.4H301.2c-34.7 0-65.5 22.4-76.2 55.5l-74.6 205.2-50.8-29.6a8 8 0 00-10.9 2.9L65 413.4c-2.2 3.8-.9 8.6 2.9 10.8l60.4 35.2-14.5 40c-1.2 3.2-1.8 6.6-1.8 10v348.2c0 15.7 11.8 28.4 26.3 28.4h67.6c12.3 0 23-9.3 25.6-22.3l7.7-37.7h545.6l7.7 37.7c2.7 13 13.3 22.3 25.6 22.3h67.6c14.5 0 26.3-12.7 26.3-28.4V509.4c0-3.4-.6-6.8-1.8-10l-14.5-40 60.3-35.2a8 8 0 003-10.8zM264 621c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm388 75c0 4.4-3.6 8-8 8H380c-4.4 0-8-3.6-8-8v-84c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v36h168v-36c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v84zm108-75c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zM220 418l72.7-199.9.5-1.3.4-1.3c1.1-3.3 4.1-5.5 7.6-5.5h427.6l75.4 208H220z\"></path></svg>");
        break;
      case 'vehiclemodel':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M19.15 8a2 2 0 00-1.72-1H15V5a1 1 0 00-1-1H4a2 2 0 00-2 2v10a2 2 0 001 1.73 3.49 3.49 0 007 .27h3.1a3.48 3.48 0 006.9 0 2 2 0 002-2v-3a1.07 1.07 0 00-.14-.52zM15 9h2.43l1.8 3H15zM6.5 19A1.5 1.5 0 118 17.5 1.5 1.5 0 016.5 19zm10 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z\"></path></svg>");
        break;
      case 'length':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M20.875 7H3.125C1.953 7 1 7.897 1 9v6c0 1.103.953 2 2.125 2h17.75C22.047 17 23 16.103 23 15V9c0-1.103-.953-2-2.125-2zm0 8H3.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008l-.012-5.946c.007-.01.052-.046.137-.046H5v3h2V9h2v4h2V9h2v3h2V9h2v4h2V9h1.875c.079.001.122.028.125.008l.012 5.946c-.007.01-.052.046-.137.046z\"></path></svg>");
        break;
      case 'weight':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M12 3a4 4 0 014 4c0 .73-.19 1.41-.54 2H18c.95 0 1.75.67 1.95 1.56C21.96 18.57 22 18.78 22 19a2 2 0 01-2 2H4a2 2 0 01-2-2c0-.22.04-.43 2.05-8.44C4.25 9.67 5.05 9 6 9h2.54A3.89 3.89 0 018 7a4 4 0 014-4m0 2a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z\"></path></svg>");
        break;
      case 'task':
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg fill=\"currentColor\" viewBox=\"0 0 16 16\" height=\"1em\" width=\"1em\"><path fill-rule=\"evenodd\" d=\"M2 2.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H2zM3 3H2v1h1V3z\"></path><path d=\"M5 3.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 4a.5.5 0 000 1h9a.5.5 0 000-1h-9z\"></path><path fill-rule=\"evenodd\" d=\"M1.5 7a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H2zm1 .5H2v1h1v-1z\"></path></svg>");
        break;
      default:
        this.svg = this.sanitizer.bypassSecurityTrustHtml("<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" height=\"1em\" width=\"1em\"><path d=\"M8.707 19.707L18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 00-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 000-2.828L19.414 3a2 2 0 00-2.828 0L15 4.586 19.414 9 21 7.414z\"></path></svg>");
        break;
    }
  }

  emitEvent() {
    this.value = (<HTMLInputElement>document.getElementById(this.id)).value;
    this.getValue.emit(this.value);
  }
}
