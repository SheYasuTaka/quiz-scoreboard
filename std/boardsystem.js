


function startcompair(){
	nump = parseInt(keys["people"], 10);

	switch (keys["rulename"]) {
	case 'marubatu':
		updatescore = (personID, judge) => {
			if (personID < 0 || scoreboard[personID][0]) {
				return false;
			}
			if (judge) {
				scoreboard[personID][1]++;
			} else {
				scoreboard[personID][2]++;
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				       if (scoreboard[i][1] >= parseInt(ruledata[0], 10)) {
					scoreboard[i][0] = "抜け";
				} else if (scoreboard[i][2] >= parseInt(ruledata[1], 10)) {
					scoreboard[i][0] = "トビ";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`${ruledata[0]}○${ruledata[1]}×`],
			[["状態", "マル", "バツ"], []],
			[[    "",      0,      0]]
		);
		break;
	case 'maruyasu':
		updatescore = (personID, judge) => {
			if (personID >= 0) {
				if (scoreboard[personID][0]) {
					return false;
				}
				if (judge) {
					scoreboard[personID][1]++;
				} else {
					scoreboard[personID][2] = parseInt(ruledata[1], 10);
				}
			}
			for (let i = 0; i < nump; i++) {
				if (scoreboard[i][2] > 0 && i != personID) {
					if (--scoreboard[i][2] <= 0) {
						scoreboard[i][0] = "";
					}
				}
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				       if (scoreboard[i][1] >= parseInt(ruledata[0], 10)) {
					scoreboard[i][0] = "抜け";
				} else if (scoreboard[i][2] > 0) {
					scoreboard[i][0] = "休み";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`${ruledata[0]}○${ruledata[1]}休`],
			[["状態", "マル", "休み"], []],
			[[    "",      0,      0]]
		);
		break;
	case 'ren-maruyasu':
		updatescore = (personID, judge) => {
			if (personID >= 0) {
				if (scoreboard[personID][0] === "抜け" ||
					scoreboard[personID][0] === "休み") {
					return false;
				}
				if (judge) {
					scoreboard[personID][1] += ++scoreboard[personID][2];
				} else {
					scoreboard[personID][2] = 0;
					scoreboard[personID][3] = parseInt(ruledata[1], 10);
				}
			}
			for (let i = 0; i < nump; i++) {
				if (i === personID) continue;
				if (personID >= 0 && judge) scoreboard[i][2] = 0;
				if (scoreboard[i][3] > 0) {
					--scoreboard[i][3];
				}
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				       if (scoreboard[i][1] >= parseInt(ruledata[0], 10)) {
					scoreboard[i][0] = "抜け";
				} else if (scoreboard[i][2] > 0) {
					scoreboard[i][0] = "連答";
				} else if (scoreboard[i][3] > 0) {
					scoreboard[i][0] = "休み";
				} else {
					scoreboard[i][0] = "";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`連付${ruledata[0]}○${ruledata[1]}休`],
			[["状態", "マル", "連答", "休み"], []],
			[[    "",      0,      0,      0]]
		);
		break;
	case 'nbyn':
		ruledata[0] = parseInt(ruledata[0], 10);
		updatescore = (personID, judge) => {
			if (personID >= 0) {
				if (scoreboard[personID][0]) {
					return false;
				}
				if (judge) {
					scoreboard[personID][1]++;
				} else {
					scoreboard[personID][2]--;
				}
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				       if (scoreboard[i][1] * scoreboard[i][2] >= ruledata[0] * ruledata[0]) {
					scoreboard[i][0] = "抜け";
				} else if (scoreboard[i][2] <= 0) {
					scoreboard[i][0] = "トビ";
				} else {
					scoreboard[i][0] = "";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`${ruledata[0]}by${ruledata[0]}`],
			[["状態", "正解ポイント", "誤答ポイント"], []],
			[[    "",              0,    ruledata[0]]]
		);
		break;
	case 'square':
		ruledata[0] = parseInt(ruledata[0], 10);
		ruledata[1] = parseInt(ruledata[1], 10);
		updatescore = (personID, judge) => {
			if (personID >= 0) {
				if (scoreboard[personID][0]) {
					return false;
				}
				if (judge) {
					scoreboard[personID][2 - (history.length % 2)]++;
				} else {
					scoreboard[personID][2 - (history.length % 2)] = 0;
					scoreboard[personID][3]++;
				}
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				       if (scoreboard[i][1] * scoreboard[i][2] >= ruledata[0]) {
					scoreboard[i][0] = "抜け";
				} else if (scoreboard[i][3] >= ruledata[1]) {
					scoreboard[i][0] = "トビ";
				} else {
					scoreboard[i][0] = "";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`Square${ruledata[0]} (${ruledata[1]}×)`],
			[["状態", "α", "β", "バツ"], []],
			[[    "",    0,    0,      0]]
		);
		break;
	case 'divide':
		ruledata[0] = parseInt(ruledata[0], 10);
		updatescore = (personID, judge) => {
			let sc = scoreboard[personID];
			if (personID >= 0) {
				if (sc[0]) {
					return false;
				}
				if (judge) {
					sc[1] += ruledata[0];
				} else {
					sc[1] = Math.floor(sc[1] / ++sc[2]);
				}
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				let sci = scoreboard[i];
				       if (sci[1] >= ruledata[0] * ruledata[0]) {
					sci[0] = "抜け";
				} else if (sci[1] <= 0) {
					sci[0] = "トビ";
				} else {
					sci[0] = "";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`${ruledata[0]}divide${ruledata[0]}`],
			[["状態",       "pts", "バツ"], []],
			[[    "", ruledata[0],      0]]
		);
		break;
	case 'nbyn-spec':
		ruledata[0] = parseInt(ruledata[0], 10);
		updatescore = (personID, judge) => {
			let sc = scoreboard[personID];
			if (personID >= 0) {
				if (sc[0]) {
					return false;
				}
				if (judge) {
					sc[1] += history.length;
				} else {
					sc[2] -= history.length;
				}
			}
			return true;
		};
		updatestatus = () => {
			for (let i = 0; i < nump; i++) {
				let sci = scoreboard[i];
				       if (sci[1] * sci[2] >= ruledata[0] * ruledata[0]) {
					sci[0] = "抜け";
				} else if (sci[2] <= 0) {
					sci[0] = "トビ";
				} else {
					sci[0] = "";
				}
			}
		};
		statcolor = defaultColor;
		shortInit(
			[`${ruledata[0]}by${ruledata[0]} Special`],
			[["状態", "α",        "β"], []],
			[[    "",    0, ruledata[0]]]
		);
		break;
	default:
		alert(`存在しないルールIDです: ${keys["rulename"]}`);
		break;
	}
}
