import { Component } from '@angular/core'
import { ModelService } from '../shared/services/model.service'
import { ConfigService } from '../shared/services/config.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(public modalService: ModelService, public config: ConfigService){}
}
