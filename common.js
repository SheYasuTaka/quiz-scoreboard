
const gId = document.getElementById.bind(document);
const toArray = (obj) => Array.prototype.slice.call(obj);

const keys = (obj => (
	document.location.search ?  
	(document.location.search.match(/^.(.*)$/)[1].split('&').forEach(e=>{
		const s = e.match(/^([^=]+)=(.*)$/);
		obj[s[1]] = s[2];
	}),
	obj) : {}
))({});

const filename = document.location.href.match(/^.*\/(.+?)(?=\?|$)/)[1];

const isClassed = (tag, cl) => {
	return new Boolean(tag.className.match(new RegExp(`(^|\\b)${cl}(\\b|$)`)));
}

const addClassName = (tag, cl) => {
	if (!tag.className.match(new RegExp(`(^|\\b)${cl}(\\b|$)`))) {
		tag.className += (tag.className ? ' ' : '') + cl;
	}
}

const removeClassName = (tag, cl) => {
	tag.className = tag.className.replace(new RegExp(`(^|\\b)${cl}(\\b|$)`, 'g'), '').replace(/(\b\s+?\b)/g, " ");
	//  first replace: removing classes, which is not any other classes
	// second replace: making spaces clear among classes
}

const isNum = (str) => {
	return str.match(/^[0-9]+$/);
}

const isPositive = (str) => {
	return isNum(str) && str.match(/[^0]/);
}

const messageForcingNum = o => `${o}は数字(0-9)で入力`;

const messageForcingPositive = o => `${o}は正の整数で入力`;

const tableaxes = (table, h, w) => {
	if (table.tagName === 'TABLE') table = table.children[0];
	return table.children[h].children[w];
}

const rdTableParse = (table) => {
	if (table.tagName !== 'TABLE') return;
	const ruleName = table.id;
	table = toArray(table.children[0].children);
	let result = table.map(e=>e.children[1].children[0].value);
	result.ruleName = ruleName;
	return result;
}
