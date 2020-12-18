import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import html2pdf from 'html2pdf.js';
import { PdfPageComponent } from '../pdf-page/pdf-page.component';

@Component({
  selector: 'app-pdf-creator',
  templateUrl: './pdf-creator.component.html',
  styleUrls: ['./pdf-creator.component.scss']
})
export class PdfCreatorComponent implements OnInit {

  @ViewChild('priceListPDF', { static: true, read: ViewContainerRef }) priceListPDF: ViewContainerRef;

  priceList: {name: string, image: string, brand: string, price: number, checked: boolean}[] = [
    {
      name: 'Gol',
      image: 'https://catalogo.webmotors.com.br/imagens/prod/347690/VOLKSWAGEN_GOL_1.0_12V_MPI_TOTALFLEX_4P_MANUAL_34769014430388697.png?s=fill&w=440&h=330&q=80&t=true',
      brand: 'Wolksvagem',
      price: 40000,
      checked: false
    },
    {
      name: 'Uno com escada em cima',
      image: 'https://www.autoentusiastas.com.br/ae/wp-content/uploads/2016/12/dea02d-GTA5-2016-08-28-17-25-48-602.jpg',
      brand: 'Fiat',
      price: 99999999,
      checked: false
    },
    {
      name: 'Camaro Amarelo',
      image: 'https://3.bp.blogspot.com/-TUbhmTzSOhA/WKC9Xada7NI/AAAAAAAAB7Y/iWaOJgGrh3olWsJC11dZsSpy7lW9DxbKgCLcB/s1600/Camaro-Amarelo-11.jpg',
      brand: 'Chevrolet',
      price: 1234,
      checked: false
    },
    {
      name: 'Ecosport',
      image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2018/05/13.jpg',
      brand: 'Ford',
      price: 69999,
      checked: false
    },
  ];

  constructor(
    private readonly resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void { }

  selectItems(): void {
    const title = 'Preço dos carros para 2021';

    this.createPDF(title, this.priceList.filter(car => car.checked));
  }

  private createPDF(title: string, priceList: {name: string, image: string, brand: string, price: number, checked: boolean}[]): void {
    this.priceListPDF.clear();
    const factory = this.resolver.resolveComponentFactory(PdfPageComponent);
    const componentRef = this.priceListPDF.createComponent(factory);

    componentRef.instance.title = title;
    componentRef.instance.priceList = priceList;

    componentRef.instance.emitter.subscribe(() => {
      const config = {
        html2canvas: {
          scale: 1,
          scrollX: 0,
          scrollY: 0,
        },
      };

      this.print(componentRef.location.nativeElement, config);
      componentRef.destroy();
    });
  }

  private print(content: any, config: any): void {
    html2pdf()
      .set(config)
      .from(content)
      .toPdf()
      .outputPdf('dataurlnewwindow');
  }
}
