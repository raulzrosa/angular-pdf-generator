import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss']
})
export class PdfPageComponent implements OnInit, AfterViewInit {

  priceList: {name: string, image: string, brand: string, price: number, checked: boolean}[];
  title: string;

  emitter: EventEmitter<void> = new EventEmitter();

  constructor(

  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.emitter.emit();
  }


}
