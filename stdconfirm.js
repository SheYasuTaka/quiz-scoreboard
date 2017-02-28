
let nump;

const dispDeck = (id) => {
	toArray(gId("ruledecider").children).forEach((e, i)=>{
		e.style.display = i === id ? "initial" : "none";
	});
}

const setup = () => {
	const nump = gId("nump").value;
	if (!isNum(nump)) {
		alert(messageForcingNum("人数"));
		return false;
	} else if (parseInt(nump, 10) <= 0) {
		alert(messageForcingPositive("人数"));
		return false;
	} else if (typeof ruleID === 'undefined') {
		alert("ルールを選択");
		return false;
	} else {
		let table = rdTableParse(gId("ruledecider").children[ruleID]);
		const message = checker[table.ruleName](table);
		if (message) {
			alert(message);
			return false;
		} else {
			console.log(table.ruleName);
			location.href = `sys.html?people=${nump}&rulename=${table.ruleName}&ruledata=${table.join(',')}`;
		}
	}
}

this.onload = () => {
	toArray(gId("ruleselector").children).forEach((e, i)=>{
		e.onclick = ()=>{dispDeck(ruleID = i)};
	});
	dispDeck(-1);
}
