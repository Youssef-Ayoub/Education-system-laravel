import { Component, Input , OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
 })
export class VideoComponent {
  @Input() id: string ;
}
