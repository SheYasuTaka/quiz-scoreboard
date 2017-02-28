
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
	default:
		alert(`存在しないルールIDです: ${keys["rulename"]}`);
		break;
	}
}
