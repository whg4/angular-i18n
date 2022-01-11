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
  p4 = '我是{{ name }}'
  p5 = `{ component_property, icu_clause, case_statements }`;
  p6 = `ICU 表达式包括一个组件属性、一个 ICU 子句以及由左花括号 ( { ) 和右花括号 ( } ) 字符包围的 case 语句。`;
  name = 'Lucy'

  number = 1234;
  str = $localize`组件中的字符串`;
  str1 = $localize`我是${this.name}`;

  type = 'EDIT';

}
