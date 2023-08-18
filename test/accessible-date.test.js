import accessibleDate from "./../src/accessible-date";

const time1data = `2001-05-15T19:30`;
const time2data = `2018-05-31T07:30`;
const time3data = `2018-05-15T19:30:00Z`;
const time4data = `2018-05-31T07:30:00-02:00`;
const time5data = `2015-03-25`;
const time6data = `Wed Mar 25 2015 09:56:24 GMT+0100 (W. Europe Standard Time)`;

describe('The accessible date', () => {
	test('should ignore words in the ignore string', () => {
		expect(accessibleDate(time1data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).toBe(`Tuesday, May Month fifteenth Date Day, two thousand one Year at eleven Hour thirty minutes p m`);
		expect(accessibleDate(time2data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).toBe(`Thursday, May Month thirty-first Date Day, two thousand eighteen Year at eleven Hour thirty minutes a m`);
		expect(accessibleDate(time3data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).toBe(`Tuesday, May Month fifteenth Date Day, two thousand eighteen Year at seven Hour thirty minutes p m`);
		expect(accessibleDate(time4data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).toBe(`Thursday, May Month thirty-first Date Day, two thousand eighteen Year at nine Hour thirty minutes a m`);
		expect(accessibleDate(time5data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).toBe(`Wednesday, March Month twenty-fifth Date Day, two thousand fifteen Year at twelve Hour oh clock minutes a m`);
		expect(accessibleDate(time6data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).toBe(`Wednesday, March Month twenty-fifth Date Day, two thousand fifteen Year at eight Hour fifty-six minutes a m`);
	});
});

describe('The accessible English date should return an accessible string formatted in', () => {
	const times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	beforeEach(() => {
		times.isoDateTimePM.standard = accessibleDate(time1data, {format: `DD, M D, Y at H MM m`, military: false, language: `en`});
		times.isoDateTimePM.military = accessibleDate(time1data, {format: `DD, M D, Y at H MM m`, military: true, language: `en`});
		times.isoDateTimePM.noMeridian = accessibleDate(time1data, {format: `DD, M D, Y at H MM`, military: true, language: `en`});
		times.isoDateTimeAM.standard = accessibleDate(time2data, {format: `DD, M D, Y at H MM m`, military: false, language: `en`});
		times.isoDateTimeAM.military = accessibleDate(time2data, {format: `DD, M D, Y at H MM m`, military: true, language: `en`});
		times.isoDateTimeAM.noMeridian = accessibleDate(time2data, {format: `DD, M D, Y at H MM`, military: true, language: `en`});
		times.isoDateTimeMillisecons.standard = accessibleDate(time3data, {format: `DD, M D, Y at H MM m`, military: false, language: `en`});
		times.isoDateTimeMillisecons.military = accessibleDate(time3data, {format: `DD, M D, Y at H MM m`, military: true, language: `en`});
		times.isoDateTimeMillisecons.noMeridian = accessibleDate(time3data, {format: `DD, M D, Y at H MM`, military: true, language: `en`});
		times.isoDateTimeTimezone.standard = accessibleDate(time4data, {format: `DD, M D, Y at H MM m`, military: false, language: `en`});
		times.isoDateTimeTimezone.military = accessibleDate(time4data, {format: `DD, M D, Y at H MM m`, military: true, language: `en`});
		times.isoDateTimeTimezone.noMeridian = accessibleDate(time4data, {format: `DD, M D, Y at H MM`, military: true, language: `en`});
		times.isoDateDateOnly.standard = accessibleDate(time5data, {format: `DD, M D, Y at H MM m`, military: false, language: `en`});
		times.isoDateDateOnly.military = accessibleDate(time5data, {format: `DD, M D, Y at H MM m`, military: true, language: `en`});
		times.isoDateDateOnly.noMeridian = accessibleDate(time5data, {format: `DD, M D, Y at H MM`, military: true, language: `en`});
		times.isoDateFullDate.standard = accessibleDate(time6data, {format: `DD, M D, Y at H MM m`, military: false, language: `en`});
		times.isoDateFullDate.military = accessibleDate(time6data, {format: `DD, M D, Y at H MM m`, military: true, language: `en`});
		times.isoDateFullDate.noMeridian = accessibleDate(time6data, {format: `DD, M D, Y at H MM`, military: true, language: `en`});
	});
    test('ISO Date and Time, PM', () => {
		expect(times.isoDateTimePM.standard).toBe('Tuesday, May fifteenth, two thousand one at eleven thirty p m');
		expect(times.isoDateTimePM.military).toBe('Tuesday, May fifteenth, two thousand one at twenty-three thirty');
		expect(times.isoDateTimePM.noMeridian).toBe('Tuesday, May fifteenth, two thousand one at twenty-three thirty');
	});
	test('ISO Date and Time, AM', () => {
		expect(times.isoDateTimeAM.standard).toBe('Thursday, May thirty-first, two thousand eighteen at eleven thirty a m');
		expect(times.isoDateTimeAM.military).toBe('Thursday, May thirty-first, two thousand eighteen at eleven thirty');
		expect(times.isoDateTimeAM.noMeridian).toBe('Thursday, May thirty-first, two thousand eighteen at eleven thirty');
	});
	test('ISO Date and Time, Milliseconds', () => {
		expect(times.isoDateTimeMillisecons.standard).toBe('Tuesday, May fifteenth, two thousand eighteen at seven thirty p m');
		expect(times.isoDateTimeMillisecons.military).toBe('Tuesday, May fifteenth, two thousand eighteen at nineteen thirty');
		expect(times.isoDateTimeMillisecons.noMeridian).toBe('Tuesday, May fifteenth, two thousand eighteen at nineteen thirty');
	});
	test('ISO Date and Time, Timezone', () => {
		expect(times.isoDateTimeTimezone.standard).toBe('Thursday, May thirty-first, two thousand eighteen at nine thirty a m');
		expect(times.isoDateTimeTimezone.military).toBe('Thursday, May thirty-first, two thousand eighteen at zero nine thirty');
		expect(times.isoDateTimeTimezone.noMeridian).toBe('Thursday, May thirty-first, two thousand eighteen at zero nine thirty');
	});
	test('ISO Date and Time, Date Only', () => {
		expect(times.isoDateDateOnly.standard).toBe('Wednesday, March twenty-fifth, two thousand fifteen at twelve oh clock a m');
		expect(times.isoDateDateOnly.military).toBe('Wednesday, March twenty-fifth, two thousand fifteen at zero zero zero zero');
		expect(times.isoDateDateOnly.noMeridian).toBe('Wednesday, March twenty-fifth, two thousand fifteen at zero zero zero zero');
	});
	test('ISO Date and Time, Full Date', () => {
		expect(times.isoDateFullDate.standard).toBe('Wednesday, March twenty-fifth, two thousand fifteen at eight fifty-six a m');
		expect(times.isoDateFullDate.military).toBe('Wednesday, March twenty-fifth, two thousand fifteen at zero eight fifty-six');
		expect(times.isoDateFullDate.noMeridian).toBe('Wednesday, March twenty-fifth, two thousand fifteen at zero eight fifty-six');
	});
});

describe('The accessible Spanish date should return an accessible string formatted in', () => {
	const times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	beforeEach(() => {
		times.isoDateTimePM.standard = accessibleDate(time1data, {format: `DD, el D de M, Y a H MM m`, military: false, language: `es`});
		times.isoDateTimePM.noMeridian = accessibleDate(time1data, {format: `DD, el D de M, Y a H MM`, military: true, language: `es`});
		times.isoDateTimeAM.standard = accessibleDate(time2data, {format: `DD, el D de M, Y a H MM m`, military: false, language: `es`});
		times.isoDateTimeAM.noMeridian = accessibleDate(time2data, {format: `DD, el D de M, Y a H MM`, military: true, language: `es`});
		times.isoDateTimeMillisecons.standard = accessibleDate(time3data, {format: `DD, el D de M, Y a H MM m`, military: false, language: `es`});
		times.isoDateTimeMillisecons.noMeridian = accessibleDate(time3data, {format: `DD, el D de M, Y a H MM`, military: true, language: `es`});
		times.isoDateTimeTimezone.standard = accessibleDate(time4data, {format: `DD, el D de M, Y a H MM m`, military: false, language: `es`});
		times.isoDateTimeTimezone.noMeridian = accessibleDate(time4data, {format: `DD, el D de M, Y a H MM`, military: true, language: `es`});
		times.isoDateDateOnly.standard = accessibleDate(time5data, {format: `DD, el D de M, Y a H MM m`, military: false, language: `es`});
		times.isoDateDateOnly.noMeridian = accessibleDate(time5data, {format: `DD, el D de M, Y a H MM`, military: true, language: `es`});
		times.isoDateFullDate.standard = accessibleDate(time6data, {format: `DD, el D de M, Y a H MM m`, military: false, language: `es`});
		times.isoDateFullDate.noMeridian = accessibleDate(time6data, {format: `DD, el D de M, Y a H MM`, military: true, language: `es`});
	});
    test('ISO Date and Time, PM', () => {
		expect(times.isoDateTimePM.standard).toBe('martes, el quince de mayo, dos mil uno a once y media de la tarde');
		expect(times.isoDateTimePM.noMeridian).toBe('martes, el quince de mayo, dos mil uno a once y media');
	});
	test('ISO Date and Time, AM', () => {
		expect(times.isoDateTimeAM.standard).toBe('jueves, el treinta y uno de mayo, dos mil dieceocho a once y media de la mañana');
		expect(times.isoDateTimeAM.noMeridian).toBe('jueves, el treinta y uno de mayo, dos mil dieceocho a once y media');
	});
	test('ISO Date and Time, Milliseconds', () => {
		expect(times.isoDateTimeMillisecons.standard).toBe('martes, el quince de mayo, dos mil dieceocho a siete y media de la tarde');
		expect(times.isoDateTimeMillisecons.noMeridian).toBe('martes, el quince de mayo, dos mil dieceocho a siete y media');
	});
	test('ISO Date and Time, Timezone', () => {
		expect(times.isoDateTimeTimezone.standard).toBe('jueves, el treinta y uno de mayo, dos mil dieceocho a nueve y media de la mañana');
		expect(times.isoDateTimeTimezone.noMeridian).toBe('jueves, el treinta y uno de mayo, dos mil dieceocho a nueve y media');
	});
	test('ISO Date and Time, Date Only', () => {
		expect(times.isoDateDateOnly.standard).toBe('miércoles, el veinticinco de marzo, dos mil quince a doce de la mañana');
		// expect(times.isoDateDateOnly.noMeridian).toBe('miércoles, el veinticinco de marzo, dos mil quince a doce');
	});
	test('ISO Date and Time, Full Date', () => {
		expect(times.isoDateFullDate.standard).toBe('miércoles, el veinticinco de marzo, dos mil quince a ocho y cincuenta y seis de la mañana');
		expect(times.isoDateFullDate.noMeridian).toBe('miércoles, el veinticinco de marzo, dos mil quince a ocho y cincuenta y seis');
	});
});

describe('The accessible French date should return an accessible string formatted in', () => {
	const times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	beforeEach(() => {
		times.isoDateTimePM.standard = accessibleDate(time1data, {format: `DD D M Y à H heures MM m`, military: false, language: `fr`});
		times.isoDateTimePM.noMeridian = accessibleDate(time1data, {format: `DD D M Y à H heures MM`, military: true, language: `fr`});
		times.isoDateTimeAM.standard = accessibleDate(time2data, {format: `DD D M Y à H heures MM m`, military: false, language: `fr`});
		times.isoDateTimeAM.noMeridian = accessibleDate(time2data, {format: `DD D M Y à H heures MM`, military: true, language: `fr`});
		times.isoDateTimeMillisecons.standard = accessibleDate(time3data, {format: `DD D M Y à H heures MM m`, military: false, language: `fr`});
		times.isoDateTimeMillisecons.noMeridian = accessibleDate(time3data, {format: `DD D M Y à H heures MM`, military: true, language: `fr`});
		times.isoDateTimeTimezone.standard = accessibleDate(time4data, {format: `DD D M Y à H heures MM m`, military: false, language: `fr`});
		times.isoDateTimeTimezone.noMeridian = accessibleDate(time4data, {format: `DD D M Y à H heures MM`, military: true, language: `fr`});
		times.isoDateDateOnly.standard = accessibleDate(time5data, {format: `DD D M Y à H heures MM m`, military: false, language: `fr`});
		times.isoDateDateOnly.noMeridian = accessibleDate(time5data, {format: `DD D M Y à H heures MM`, military: true, language: `fr`});
		times.isoDateFullDate.standard = accessibleDate(time6data, {format: `DD D M Y à H heures MM m`, military: false, language: `fr`});
		times.isoDateFullDate.noMeridian = accessibleDate(time6data, {format: `DD D M Y à H heures MM`, military: true, language: `fr`});
	});
    test('ISO Date and Time, PM', () => {
		expect(times.isoDateTimePM.standard).toBe('mardi quinze mai deux mille une à vingt-trois heures trente du soir');
		expect(times.isoDateTimePM.noMeridian).toBe('mardi quinze mai deux mille une à vingt-trois heures trente');
	});
	test('ISO Date and Time, AM', () => {
		expect(times.isoDateTimeAM.standard).toBe('jeudi Trente et un mai deux mille dix-huit à onze heures trente du matin');
		expect(times.isoDateTimeAM.noMeridian).toBe('jeudi Trente et un mai deux mille dix-huit à onze heures trente');
	});
	test('ISO Date and Time, Milliseconds', () => {
		expect(times.isoDateTimeMillisecons.standard).toBe('mardi quinze mai deux mille dix-huit à dix-neuf heures trente du soir');
		expect(times.isoDateTimeMillisecons.noMeridian).toBe('mardi quinze mai deux mille dix-huit à dix-neuf heures trente');
	});
	test('ISO Date and Time, Timezone', () => {
		expect(times.isoDateTimeTimezone.standard).toBe('jeudi Trente et un mai deux mille dix-huit à neuf heures trente du matin');
		expect(times.isoDateTimeTimezone.noMeridian).toBe('jeudi Trente et un mai deux mille dix-huit à neuf heures trente');
	});
	test('ISO Date and Time, Date Only', () => {
		expect(times.isoDateDateOnly.standard).toBe('mercredi vingt-cinq mars deux mille quinze à zéro heures du matin');
		expect(times.isoDateDateOnly.noMeridian).toBe('mercredi vingt-cinq mars deux mille quinze à zéro heures');
	});
	test('ISO Date and Time, Full Date', () => {
		expect(times.isoDateFullDate.standard).toBe('mercredi vingt-cinq mars deux mille quinze à huit heures cinquante-six du matin');
		expect(times.isoDateFullDate.noMeridian).toBe('mercredi vingt-cinq mars deux mille quinze à huit heures cinquante-six');
	});
});