
let nump, viewlen, datalen;
let scoreboard = [];

let ruleID = keys["ruleID"];
const ruledata = (keys["ruledata"] ? keys["ruledata"].split(',') : []);
let args;

let history = [];
let problemID;

function setRuleBanner(str){
	gId("rule").innerText = str;
}

function writeboard(){
	const board = gId("board");
	for (let i = 0; i < nump; i++) {
		for (let j = 0; j < viewlen; j++) {
			tableaxes(board, j + 1, i + 1).innerText = scoreboard[i][j];
			tableaxes(board, j + 1, i + 1).bgColor = statcolor(scoreboard[i][0]) || "";
		}
	}

	gId("problem-id").innerText = problemID;
}

function initboard(initvals){
	const board = gId("board");
	for (let i = 0; i < nump; i++) {
		for (let j = 0; j < datalen; j++) {
			scoreboard[i][j] = initvals[j];
		}
	}
	problemID = 1;
	writeboard();

	history.push(JSON.stringify(scoreboard));
}

function maketable(visibleargs, hiddenargs, debugswitch){
	const board = gId("board");

	if (debugswitch) {
		 visibleargs = visibleargs.concat(hiddenargs);
		 hiddenargs = [];
	}

	viewlen = visibleargs.length;
	datalen = viewlen + hiddenargs.length;
	args = visibleargs.slice();

	for (let i = 0; i <= viewlen; i++) {
		const row = board.insertRow();
		for (let j = 0; j <= nump; j++) {
			row.insertCell();
		}
	}

	for (i = 1; i <= nump; i++) {
		const namecell = tableaxes(board, 0, i);
		namecell.innerHTML = `<input type=text value="No.${i}" />`;
	}

	for (i = 1; i <= args.length; i++) {
		const memidcell = tableaxes(board, i, 0);
		memidcell.innerText = visibleargs[i - 1];
	}

	scoreboard = new Array(nump);
	for (let i = 0; i < nump; i++) scoreboard[i] = new Array(datalen);

	gId("through-btn").onclick = () => prog(-1);
	gId("through-btn").value = "スルー";
	
}

function prog(personID, judge){
	const isActivePerson = updatescore(personID, judge);
	if (!isActivePerson) return;
	updatestatus();
	problemID++;
	writeboard();
	history.push(JSON.stringify(scoreboard));
}

function setStdButton(){
	const board = gId("board");
	const deckRow = board.insertRow(-1);
	for (let i = 0; i <= nump; i++) deckRow.insertCell();

	for (let i = 1; i <= nump; i++) {
		deckRow.children[i].innerHTML = `
		<input type=button value="○">
		<input type=button value="×">`.replace(/[\t\n]/g, '');
		deckRow.children[i].children[0].onclick = ()=>prog(i-1, true);
		deckRow.children[i].children[1].onclick = ()=>prog(i-1, false);
	}
}

function shortInit(bann, mktab, inbd){
	setRuleBanner.apply(null, bann);
	maketable.apply(null, mktab);
	initboard.apply(null, inbd);
	setStdButton();
}

function defaultColor(status){
	switch (status) {
	case "抜け":
		return "#FF4567";
	case "トビ":
		return "#4444CC";
	case "休み":
		return "#444444";
	case "連答":
		return "#7B7661";
	}
}


this.onload = () => {
	startcompair();
}
