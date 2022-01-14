import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Lucy'
  str = $localize`:test|a test12341234:组件中的字符串`;
  str1 = $localize`我是${this.name}`;
  type = 'EDIT';
  str2 = $localize`我是${this.type}`;
  
}
