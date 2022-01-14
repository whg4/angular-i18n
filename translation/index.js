// 执行替换时请先运行 npm run i18n:user 生成最新的翻译文件，然后再执行本脚本进行替换 
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { decode, encode } = require('html-entities'); // 转码html entities之类的数据，类似&nbsp; 这种编码
const targetDir = path.join(__dirname, '../src/locale');

// regex 
const segmentPattern = /<segment.*?<\/segment>/isg;
const sourcePattern = /<source>(.*?)<\/source>/isg;
const xliffPattern = /<xliff(.*?)>/isg;
const phPattern = /<ph.*?\/>/isg;

const sourceLang = 'CN';
const languages = ['en'];
const langMap = { en: 'EN' };


const getTranslation = () => {
	const translationMap = new Map();
	const book = xlsx.readFile(path.join(__dirname, './translation_file.xls'), { raw: true, cellHTML: false });
	const sheet = book.Sheets[book.SheetNames[0]];
	const json = xlsx.utils.sheet_to_json(sheet, { raw: true, cellHTML: false });
	json.forEach(row => {
		const CN = decode(String(row[sourceLang]).trim());
		if (!translationMap.has(CN)) {
			translationMap.set(CN, row);
		}
	});
	return translationMap;
}

const readFile = (path) => new Promise(
	(resolve, reject) => fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			reject(err);
			return;
		}
		resolve(data);
	})
)

const writeFile = (path, content) => new Promise(
	(resolve, reject) => fs.writeFile(path, content, 'utf8', (err) => {
		if (err) {
			reject(err);
			return;
		}
		resolve();
	})
)

const normalizeStr = (val) => {
	const str = String(val).trim();
	return str[0].toUpperCase() + str.slice(1);
}

const replace = async () => {
	try {
		const translation = getTranslation();
		const unTranslationMap = new Map();
		for (const lang of languages) {
			const fileStr = await readFile(path.join(targetDir, `./messages.xlf`));
			// 替换成目标语言
			let newFileStr = fileStr.replace(xliffPattern, (xliff, p1) => {
				return xliff.replace(p1, `${p1} trgLang="${lang}"`)
			});

			newFileStr = newFileStr.replace(segmentPattern, (segment) => {
				const sourceMatch = /<source>(.*?)<\/source>/isg.exec(segment);
				let replaceStr = segment;
				const key = decode(sourceMatch[1].trim());
				if (translation.has(key)) {
					const map = translation.get(key);
					replaceStr = segment.replace(sourcePattern, (target, p1) => {
						let targetStr = normalizeStr(map[langMap[lang]]);
						if(!phPattern.test(key)) {
							targetStr = encode(targetStr);
						}
						return `${target}\n<target>${targetStr}</target>`;
					});
				} else {
					if (!unTranslationMap.has(key)) {
						unTranslationMap.set(key, key);
					}
				}
				return replaceStr;
			});
			await writeFile(path.join(targetDir, `./messages.${lang}.xlf`), newFileStr);
			console.log(`--- replace ${lang} success ---`);
		}
		saveUntranslatedField(unTranslationMap);
	} catch (error) {
		console.log('--- replace error ---', error);
	}
}

const saveUntranslatedField = (map) => {
	try {
		const header = ['CN', 'EN'];
		const data = [header];

		for (const field of map) {
			data.push([field, ...Array.from({ length: header.slice(1).length }, () => '')]);
		}

		const ws = xlsx.utils.aoa_to_sheet(data);
		const wb = xlsx.utils.book_new();
		xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
		xlsx.writeFile(wb, path.join(__dirname, `untranlatedField.xls`));
	} catch (error) {
		console.log('--- extract untranslated field failed ---', error);
	}
}

replace();