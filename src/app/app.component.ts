import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  money = 10;
  today = new Date();
  number = 123456789.123456789;
  percent = .9111;
}
