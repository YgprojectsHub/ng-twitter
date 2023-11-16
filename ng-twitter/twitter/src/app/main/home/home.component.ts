import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../shared/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private config: ConfigService){}

  ngOnInit(): void {
    this.config.updateHeaderSettings("Home")
  }
}
