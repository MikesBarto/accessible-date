module.exports = function accessibleDate(date, settings) {
    
    if (!date) {
        console.error(`accessible-date: You must supply a date in ISO format.`);
        return '';
    }

    if (!settings.format || typeof settings.format !== 'string') {
        console.error(`accessible-date: You must supply a format.`);
        return '';
    }

    if (!settings.military) {
        settings.military = false;
    }

    // Add settings object that holds the parts of the date formatted
    const dateParts = {
        // Day (DD)
        day: [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
        // Minute (MM)
        minute: {
            standard: [`oh clock`, `oh one`, `oh two`, `oh three`, `oh four`, `oh five`, `oh six`, `oh seven`, `oh eight`, `oh nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`],
            military: [`zero zero`, `zero one`, `zero two`, `zero three`, `zero four`, `zero five`, `zero six`, `zero seven`, `zero eight`, `zero nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`]
        },
        // Month (M)
        month: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
        // Date (D)
        date: [`first`, `second`, `third`, `fourth`, `fifth`, `sixth`, `seventh`, `eigth`, `ninth`, `tenth`, `eleventh`, `twelfth`, `thirteenth`, `fourteenth`, `fifteenth`, `sixteenth`, `seventeenth`, `eighteenth`, `nineteenth`, `twentieth`, `twenty-first`, `twenty-second`, `twenty-third`, `twenty-fourth`, `twenty-fifth`, `twenty-sixth`, `twenty-seventh`, `twenty-eighth`, `twenty-ninth`, `thirtieth`, `thirty-first`],
        // Year (Y)
        year: {
            century: [``, `one hundred`, `two hundred`, `three hundred`, `four hundred`, `five hundred`, `six hundred`, `seven hundred`, `eight hundred`, `nine hundred`, `one thousand`, `eleven hundred`, `twelve hundred`, `thirteen hundred`, `fourteen hundred`, `fifteen hundred`, `sixteen hundred`, `seventeen hundred`, `eighteen hundred`, `nineteen hundred`, `two thousand`, `twenty one`],
            decade: [``, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`, `sixty`, `sixty-one`, `sixty-two`, `sixty-three`, `sixty-four`, `sixty-five`, `sixty-six`, `sixty-seven`, `sixty-eight`, `sixty-nine`, `seventy`, `seventy-one`, `seventy-two`, `seventy-three`, `seventy-four`, `seventy-five`, `seventy-six`, `seventy-seven`, `seventy-eight`, `seventy-nine`, `eighty`, `eighty-one`, `eighty-two`, `eighty-three`, `eighty-four`, `eighty-five`, `eighty-six`, `eighty-seven`, `eighty-eight`, `eighty-nine`, `ninety`, `ninety-one`, `ninety-two`, `ninety-three`, `ninety-four`, `ninety-five`, `ninety-six`, `ninety-seven`, `ninety-eight`, `ninety-nine`]
        },
        // Hour (H-
        hour: {
            standard: [`twelve`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`],
            military: [`zero zero`, `zero one`, `zero two`, `zero three`, `zero four`, `zero five`, `zero six`, `zero seven`, `zero eight`, `zero nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`]
        },
        // Second (S)
        second: [`zero`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`],
        // Meridian (m)
        meridian: [`a m`, `p m`]
    };

    // Convert the date using new Date();
    const dateToFormat = new Date(date);
    const datePartsParsed = {
        DD: dateParts.day[dateToFormat.getUTCDay()],
        MM: settings.military ? dateParts.minute.military[dateToFormat.getUTCMinutes()] : dateParts.minute.standard[dateToFormat.getUTCMinutes()],
        M: dateParts.month[dateToFormat.getUTCMonth()],
        D: dateParts.date[dateToFormat.getUTCDate() - 1],
        Y: (() => {
            const year = `${dateToFormat.getUTCFullYear()}`;
            let century = dateParts.year.century[parseInt(year.substr(0, 2))];
            let decade = dateParts.year.decade[parseInt(year.substr(2, 3))];
            return `${century} ${decade}`;
        })(),
        H: settings.military ? dateParts.hour.military[dateToFormat.getUTCHours()] : dateParts.hour.standard[dateToFormat.getUTCHours()],
        S: dateParts.date[dateToFormat.getUTCSeconds()],
        m: settings.military ? '' : (dateToFormat.getUTCHours() >= 12) ? dateParts.meridian[1] : dateParts.meridian[0]
    };
    
    // Format the date based off of the format requested
    return Object.keys(datePartsParsed).reduce((formatted, datePart) => {
        return formatted.replace(datePart, datePartsParsed[datePart]); 
    }, settings.format).trim();

};