const convert = (minutes) => {
	return {
		hour: parseInt(minutes / 60),
		minutes: minutes % 60
	};
};
const time = {
	formatToString: (minutes) => {
		const time = convert(minutes);
		const hourStr = ('0' + time.hour).slice(-2);
		const minutesStr = ('0' + time.minutes).slice(-2);
		return `${hourStr}:${minutesStr}`;
	}
};
export default time;
