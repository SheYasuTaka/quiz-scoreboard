
const checker = {
	"marubatu": function (table){
		if (!isNum(table[0])) {
			return messageForcingNum("マル数");
		}
		if (parseInt(table[0], 10) <= 0) {
			return messageForcingPositive("マル数");
		}
		if (!isNum(table[1])) {
			return messageForcingNum("バツ数");
		}
		if (parseInt(table[1], 10) <= 0) {
			return messageForcingPositive("バツ数");
		}
		return false;
	},
	"maruyasu": function (table){
		if (!isNum(table[0])) {
			return messageForcingNum("マル数");
		}
		if (parseInt(table[0], 10) <= 0) {
			return messageForcingPositive("マル数");
		}
		if (!isNum(table[1])) {
			return messageForcingNum("休み数");
		}
		if (parseInt(table[1], 10) <= 0) {
			return messageForcingPositive("休み数");
		}
		return false;
	}
};
