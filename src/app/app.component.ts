import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  p1 = `<element i18n="{i18n_metadata}">{string_to_translate}</element>`;
  p2 = `<element i18n-{attribute_name}="{i18n_metadata}" {attribute_name}="{attribute_value}" />`;
  p3 = `$localize \`:{i18n_metadata}:string_to_translate\``

  number = 1234;
  str = $localize`组件中的字符串`;
}
