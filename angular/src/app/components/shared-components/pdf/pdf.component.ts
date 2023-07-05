import { Component, Input , OnInit , OnDestroy } from '@angular/core';
import { GcPdfViewer } from '@grapecity/gcpdfviewer';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @Input() id: string = 'Ahmed.pdf' ;
  ngAfterViewInit() {
    const viewer = new GcPdfViewer("#viewer", {
      workerSrc: "//node_modules/@grapecity/gcpdfviewer/gcpdfviewer.worker.js",
      restoreViewStateOnLoad: false
    });
    viewer.addDefaultPanels();
    const Url="../../assets/pdf/"+this.id;
    viewer.open(Url);
  }
}



