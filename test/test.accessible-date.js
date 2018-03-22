'use strict';

import { expect } from 'chai';

global.expect = expect;

const accessibleDate = require('../src/accessible-date.js');
const time1data = `2001-05-15T19:30`;
const time2data = `2018-05-31T07:30`;
const time3data = `2018-05-15T19:30:00Z`;
const time4data = `2018-05-31T07:30:00-02:00`;
const time5data = `2015-03-25`;
const time6data = `Wed Mar 25 2015 09:56:24 GMT+0100 (W. Europe Standard Time)`;
describe('The accessible date', () => {
	it('should ignore words in the ignore string', () => {
		expect(accessibleDate(time1data, {format: `DD, M Month D Date Day, Y Year at H Hour MM minutes m`, military: false, language: `en`})).to.equal('Tuesday, May Month fifteenth Date Day, two thousand one Year at seven Hour thirty minutes p m');
	});
});
describe('The accessible English date should return an accessible string formatted in', () => {
	let times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	before(() => {
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
    it('ISO Date and Time, PM', () => {
		expect(times.isoDateTimePM.standard).to.equal('Tuesday, May fifteenth, two thousand one at seven thirty p m');
		expect(times.isoDateTimePM.military).to.equal('Tuesday, May fifteenth, two thousand one at nineteen thirty');
		expect(times.isoDateTimePM.noMeridian).to.equal('Tuesday, May fifteenth, two thousand one at nineteen thirty');
	});
	it('ISO Date and Time, AM', () => {
		expect(times.isoDateTimeAM.standard).to.equal('Thursday, May thirty-first, two thousand eighteen at seven thirty a m');
		expect(times.isoDateTimeAM.military).to.equal('Thursday, May thirty-first, two thousand eighteen at zero seven thirty');
		expect(times.isoDateTimeAM.noMeridian).to.equal('Thursday, May thirty-first, two thousand eighteen at zero seven thirty');
	});
	it('ISO Date and Time, Milliseconds', () => {
		expect(times.isoDateTimeMillisecons.standard).to.equal('Tuesday, May fifteenth, two thousand eighteen at seven thirty p m');
		expect(times.isoDateTimeMillisecons.military).to.equal('Tuesday, May fifteenth, two thousand eighteen at nineteen thirty');
		expect(times.isoDateTimeMillisecons.noMeridian).to.equal('Tuesday, May fifteenth, two thousand eighteen at nineteen thirty');
	});
	it('ISO Date and Time, Timezone', () => {
		expect(times.isoDateTimeTimezone.standard).to.equal('Thursday, May thirty-first, two thousand eighteen at nine thirty a m');
		expect(times.isoDateTimeTimezone.military).to.equal('Thursday, May thirty-first, two thousand eighteen at zero nine thirty');
		expect(times.isoDateTimeTimezone.noMeridian).to.equal('Thursday, May thirty-first, two thousand eighteen at zero nine thirty');
	});
	it('ISO Date and Time, Date Only', () => {
		expect(times.isoDateDateOnly.standard).to.equal('Wednesday, March twenty-fifth, two thousand fifteen at twelve oh clock a m');
		expect(times.isoDateDateOnly.military).to.equal('Wednesday, March twenty-fifth, two thousand fifteen at zero zero zero zero');
		expect(times.isoDateDateOnly.noMeridian).to.equal('Wednesday, March twenty-fifth, two thousand fifteen at zero zero zero zero');
	});
	it('ISO Date and Time, Full Date', () => {
		expect(times.isoDateFullDate.standard).to.equal('Wednesday, March twenty-fifth, two thousand fifteen at eight fifty-six a m');
		expect(times.isoDateFullDate.military).to.equal('Wednesday, March twenty-fifth, two thousand fifteen at zero eight fifty-six');
		expect(times.isoDateFullDate.noMeridian).to.equal('Wednesday, March twenty-fifth, two thousand fifteen at zero eight fifty-six');
	});
});
describe('The accessible Spanish date should return an accessible string formatted in', () => {
	let times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	before(() => {
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
    it('ISO Date and Time, PM', () => {
		expect(times.isoDateTimePM.standard).to.equal('martes, el quince de mayo, dos mil uno a siete y media de la tarde');
		expect(times.isoDateTimePM.noMeridian).to.equal('martes, el quince de mayo, dos mil uno a siete y media');
	});
	it('ISO Date and Time, AM', () => {
		expect(times.isoDateTimeAM.standard).to.equal('jueves, el treinta y uno de mayo, dos mil dieceocho a siete y media de la mañana');
		expect(times.isoDateTimeAM.noMeridian).to.equal('jueves, el treinta y uno de mayo, dos mil dieceocho a siete y media');
	});
	it('ISO Date and Time, Milliseconds', () => {
		expect(times.isoDateTimeMillisecons.standard).to.equal('martes, el quince de mayo, dos mil dieceocho a siete y media de la tarde');
		expect(times.isoDateTimeMillisecons.noMeridian).to.equal('martes, el quince de mayo, dos mil dieceocho a siete y media');
	});
	it('ISO Date and Time, Timezone', () => {
		expect(times.isoDateTimeTimezone.standard).to.equal('jueves, el treinta y uno de mayo, dos mil dieceocho a nueve y media de la mañana');
		expect(times.isoDateTimeTimezone.noMeridian).to.equal('jueves, el treinta y uno de mayo, dos mil dieceocho a nueve y media');
	});
	it('ISO Date and Time, Date Only', () => {
		expect(times.isoDateDateOnly.standard).to.equal('miércoles, el veinticinco de marzo, dos mil quince a doce de la mañana');
		expect(times.isoDateDateOnly.noMeridian).to.equal('miércoles, el veinticinco de marzo, dos mil quince a doce');
	});
	it('ISO Date and Time, Full Date', () => {
		expect(times.isoDateFullDate.standard).to.equal('miércoles, el veinticinco de marzo, dos mil quince a ocho y cincuenta y seis de la mañana');
		expect(times.isoDateFullDate.noMeridian).to.equal('miércoles, el veinticinco de marzo, dos mil quince a ocho y cincuenta y seis');
	});
});
describe('The accessible French date should return an accessible string formatted in', () => {
	let times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	before(() => {
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
    it('ISO Date and Time, PM', () => {
		expect(times.isoDateTimePM.standard).to.equal('mardi quinze mai deux mille une à dix-neuf heures trente du soir');
		expect(times.isoDateTimePM.noMeridian).to.equal('mardi quinze mai deux mille une à dix-neuf heures trente');
	});
	it('ISO Date and Time, AM', () => {
		expect(times.isoDateTimeAM.standard).to.equal('jeudi Trente et un mai deux mille dix-huit à sept heures trente du matin');
		expect(times.isoDateTimeAM.noMeridian).to.equal('jeudi Trente et un mai deux mille dix-huit à sept heures trente');
	});
	it('ISO Date and Time, Milliseconds', () => {
		expect(times.isoDateTimeMillisecons.standard).to.equal('mardi quinze mai deux mille dix-huit à dix-neuf heures trente du soir');
		expect(times.isoDateTimeMillisecons.noMeridian).to.equal('mardi quinze mai deux mille dix-huit à dix-neuf heures trente');
	});
	it('ISO Date and Time, Timezone', () => {
		expect(times.isoDateTimeTimezone.standard).to.equal('jeudi Trente et un mai deux mille dix-huit à neuf heures trente du matin');
		expect(times.isoDateTimeTimezone.noMeridian).to.equal('jeudi Trente et un mai deux mille dix-huit à neuf heures trente');
	});
	it('ISO Date and Time, Date Only', () => {
		expect(times.isoDateDateOnly.standard).to.equal('mercredi vingt-cinq mars deux mille quinze à zéro heures du matin');
		expect(times.isoDateDateOnly.noMeridian).to.equal('mercredi vingt-cinq mars deux mille quinze à zéro heures');
	});
	it('ISO Date and Time, Full Date', () => {
		expect(times.isoDateFullDate.standard).to.equal('mercredi vingt-cinq mars deux mille quinze à huit heures cinquante-six du matin');
		expect(times.isoDateFullDate.noMeridian).to.equal('mercredi vingt-cinq mars deux mille quinze à huit heures cinquante-six');
	});
});