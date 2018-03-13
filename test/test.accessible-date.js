'use strict';

import { JSDOM } from 'jsdom';
import { expect } from 'chai';

const jsdom = new JSDOM(`
	<!doctype html>
	<html>
	<body>
		<time id="time1" datetime="2001-05-15T19:30">May 15, 2001</time>
		<time id="time2" datetime="2018-05-31T07:30">May 31, 2018</time>
		<time id="time3" datetime="2018-05-15T19:30:00Z">May 15, 2018</time>
		<time id="time4" datetime="2018-05-31T07:30:00-02:00">May 31, 2018</time>
		<time id="time5" datetime="2015-03-25">March 25, 2015</time>
		<time id="time6" datetime="Wed Mar 25 2015 09:56:24 GMT+0100 (W. Europe Standard Time)">2000</time>
	</body>
	</html>`);
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.HTMLElement = global.window.HTMLElement;
global.expect = expect;

const accessibleDate = require('../src/accessible-date.js');
const time1data = document.getElementById('time1').getAttribute('datetime');
const time2data = document.getElementById('time2').getAttribute('datetime');
const time3data = document.getElementById('time3').getAttribute('datetime');
const time4data = document.getElementById('time4').getAttribute('datetime');
const time5data = document.getElementById('time5').getAttribute('datetime');
const time6data = document.getElementById('time6').getAttribute('datetime');
describe('The accessible date should return an accessible string formatted in', () => {
	let times = {
		isoDateTimePM: {},
		isoDateTimeAM: {},
		isoDateTimeMillisecons: {},
		isoDateTimeTimezone: {},
		isoDateDateOnly: {},
		isoDateFullDate: {}
	};
	before(() => {
		times.isoDateTimePM.standard = accessibleDate(time1data, {format: `DD, M D, Y at H MM m`, military: false});
		times.isoDateTimePM.military = accessibleDate(time1data, {format: `DD, M D, Y at H MM m`, military: true});
		times.isoDateTimePM.noMeridian = accessibleDate(time1data, {format: `DD, M D, Y at H MM`, military: true});
		times.isoDateTimeAM.standard = accessibleDate(time2data, {format: `DD, M D, Y at H MM m`, military: false});
		times.isoDateTimeAM.military = accessibleDate(time2data, {format: `DD, M D, Y at H MM m`, military: true});
		times.isoDateTimeAM.noMeridian = accessibleDate(time2data, {format: `DD, M D, Y at H MM`, military: true});
		times.isoDateTimeMillisecons.standard = accessibleDate(time3data, {format: `DD, M D, Y at H MM m`, military: false});
		times.isoDateTimeMillisecons.military = accessibleDate(time3data, {format: `DD, M D, Y at H MM m`, military: true});
		times.isoDateTimeMillisecons.noMeridian = accessibleDate(time3data, {format: `DD, M D, Y at H MM`, military: true});
		times.isoDateTimeTimezone.standard = accessibleDate(time4data, {format: `DD, M D, Y at H MM m`, military: false});
		times.isoDateTimeTimezone.military = accessibleDate(time4data, {format: `DD, M D, Y at H MM m`, military: true});
		times.isoDateTimeTimezone.noMeridian = accessibleDate(time4data, {format: `DD, M D, Y at H MM`, military: true});
		times.isoDateDateOnly.standard = accessibleDate(time5data, {format: `DD, M D, Y at H MM m`, military: false});
		times.isoDateDateOnly.military = accessibleDate(time5data, {format: `DD, M D, Y at H MM m`, military: true});
		times.isoDateDateOnly.noMeridian = accessibleDate(time5data, {format: `DD, M D, Y at H MM`, military: true});
		times.isoDateFullDate.standard = accessibleDate(time6data, {format: `DD, M D, Y at H MM m`, military: false});
		times.isoDateFullDate.military = accessibleDate(time6data, {format: `DD, M D, Y at H MM m`, military: true});
		times.isoDateFullDate.noMeridian = accessibleDate(time6data, {format: `DD, M D, Y at H MM`, military: true});
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