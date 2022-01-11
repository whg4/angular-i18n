# 国际化主要流程
1.添加国际化包
ng add @angular/localize

2.通过ID引用语言环境
主要在angular.json中配置源语言及要生成的目标语言
"i18n": {
	"sourceLocale": "zh",
	"locales": {
		"en": "src/locale/messages.en.xlf"
	}
}

3.标记代码中要翻译的文案

4.执行ng extract-i18n命令提取翻译文案生成messages.xlf文件

5.根据messages.xlf文件生成其他语言版本的xlf文件

6.执行ng build --localize构建多个语言版本代码
