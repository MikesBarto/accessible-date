module.exports = function accessibleDate(date, options) {
    
    // Sanity check the function params
    if (!date) {
        console.error(`accessible-date: You must supply a date in ISO format.`);
        return '';
    }

    const settings = {
        supportedLanguages: [`en`, `es`, `fr`],
        language: '',
        military: false,
        format: '',
        ignore: [`heure`, `heures`, `minute`, `minutes`, `second`, `seconds`, `Day`, `Date`, `Hour`, `Month`, `Meridian`, `Second`, `Year`]
    };

    if (!options.format || typeof options.format !== 'string') {
        console.error(`accessible-date: You must supply a format.`);
        return '';
    }
    settings.format = options.format;

    if (options.language) {
        const language = settings.supportedLanguages.find(lang => {
           return options.language === lang; 
        });
        settings.language = language || `en`;
    }

    if (
        options.military &&
        typeof options.military === `boolean` &&
        !settings.language.match(/es|fr/)
    ) {
        settings.military = options.military;
    }

    if (options.ignore && Array.isArray(options.ignore)) {
        options.ignore.forEach(ignoreString => {
            settings.ignore.push(ignoreString); 
        });
    }

    // Add settings object that holds the parts of the date formatted
    const dateParts = {
        // Day (DD)
        day: {
            en: [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
            es: [`domingo`, `lunes`, `martes`, `miércoles`, `jueves`, `viernes`, `sábado`],
            fr: [`dimanche`, `lundi`, `mardi`, `mercredi`, `jeudi`, `vendredi`, `samedi`]
        },
        // Minute (MM)
        minute: {
            en : {
                standard: [`oh clock`, `oh one`, `oh two`, `oh three`, `oh four`, `oh five`, `oh six`, `oh seven`, `oh eight`, `oh nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`],
                military: [`zero zero`, `zero one`, `zero two`, `zero three`, `zero four`, `zero five`, `zero six`, `zero seven`, `zero eight`, `zero nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`]
            },
            es: {
                standard: [``, `y uno`, `y dos`, `y tres`, `y cuatro`, `y cinco`, `y seis`, `y siete`, `y ocho`, `y nueve`, `y diez`, `y once`, `y doce`, `y trece`, `y catorce`, `y cuarto`, `y dieceseis`, `y diecesiete`, `y dieceocho`, `y diecenueve`, `y veinte`, `y veintiuno`, `y veintidós`, `y veintitrés`, `y veinticuatro`, `y veinticinco`, `y veintiséis`, `y veintisiete`, `y veintiocho`, `y veintinueve`, `y media`, `y treinta y uno`, `y treinta y dos`, `y treinta y tres`, `y treinta y cuatro`, `y treinta y cinco`, `y treinta y seis`, `y treinta y siete`, `y trienta y ocho`, `y treinta y nueve`, `y cuarenta`, `y cuarenta y uno`, `y curatenta y dos`, `y cuarenta y trece`, `y cuarenta y cuatro`, `y cuarenta y cinco`, `y cuarenta y seis`, `y cuarenta y siete`, `y cuarenta y ocho`, `y cuarenta y nueve`, `y cincuenta`, `y cincuenta y uno`, `y cincuenta y dos`, `y cincuenta y trece`, `y cincuenta y cuatro`, `y cincuenta y cinco`, `y cincuenta y seis`, `y cincuenta y siete`, `y cincuenta y ocho`, `y cincuenta y nueve`]
            },
            fr: {
                standard: [``, `une`, `deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `onze`, `douze`, `treize`, `quatorze`, `quinze`, `seize`, `dix-sept`, `dix-huit`, `dix-neuf`, `vingt`, `vingt et un`, `vingt-deux`, `vingt-trois`, `vingt-quatre`, `vingt-cinq`, `vingt-six`, `vingt-sept`, `vingt-huit`, `vingt-neuf`, `trente`, `Trente et un`, `Trente-deux`, `Trente-trois`, `Trente-quatre`, `Trente-cinq`, `Trente-six`, `Trente-sept`, `Trente-huit`, `Trente-neuf`, `quarante`, `quarante et un`, `quarante-deux`, `quarante-trois`, `quarante-quatre`, `quarante-cinq`, `quarante-six`, `quarante-sept`, `quarante-huit`, `quarante-neuf`, `cinquante`, `cinquante et un`, `cinquante-deux`, `cinquante-trois`, `cinquante-quatre`, `cinquante-cinq`, `cinquante-six`, `cinquante-sept`, `cinquante-huit`, `cinquante-neuf`]
            }
        },
        // Date (D)
        date: {
            en: [`first`, `second`, `third`, `fourth`, `fifth`, `sixth`, `seventh`, `eigth`, `ninth`, `tenth`, `eleventh`, `twelfth`, `thirteenth`, `fourteenth`, `fifteenth`, `sixteenth`, `seventeenth`, `eighteenth`, `nineteenth`, `twentieth`, `twenty-first`, `twenty-second`, `twenty-third`, `twenty-fourth`, `twenty-fifth`, `twenty-sixth`, `twenty-seventh`, `twenty-eighth`, `twenty-ninth`, `thirtieth`, `thirty-first`],
            es: [`uno`, `dos`, `tres`, `cuatro`, `cinco`, `seis`, `siete`, `ocho`, `nueve`, `diez`, `once`, `doce`, `trece`, `catorce`, `quince`, `dieceseis`, `diecesiete`, `dieceocho`, `diecenueve`, `veinte`, `veintiuno`, `veintidós`, `veintitrés`, `veinticuatro`, `veinticinco`, `veintiséis`, `veintisiete`, `veintiocho`, `veintinueve`, `treinta`, `treinta y uno`],
            fr: [`une`, `deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `onze`, `douze`, `treize`, `quatorze`, `quinze`, `seize`, `dix-sept`, `dix-huit`, `dix-neuf`, `vingt`, `vingt et un`, `vingt-deux`, `vingt-trois`, `vingt-quatre`, `vingt-cinq`, `vingt-six`, `vingt-sept`, `vingt-huit`, `vingt-neuf`, `trente`, `Trente et un`]
        },
        // Hour (H)
        hour: {
            en : {
                standard: [`twelve`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`],
                military: [`zero zero`, `zero one`, `zero two`, `zero three`, `zero four`, `zero five`, `zero six`, `zero seven`, `zero eight`, `zero nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`]
            },
            es : {
                standard: [`doce`, `uno`, `dos`, `trece`, `cuatro`, `cinco`, `seis`, `siete`, `ocho`, `nueve`, `diez`, `once`, `doce`, `uno`, `dos`, `trece`, `cuatro`, `cinco`, `seis`, `siete`, `ocho`, `nueve`, `diez`, `once`]
            },
            fr: {
                standard: [`zéro`, `une`, `deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `onze`, `douze`, `treize`, `quatorze`, `quinze`, `seize`, `dix-sept`, `dix-huit`, `dix-neuf`, `vingt`, `vingt et un`, `vingt-deux`, `vingt-trois`]
            }
        },
        // Month (M)
        month: {
            en: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
            es: [`enero`, `febrero`, `marzo`, `abril`, `mayo`, `junio`, `julio`, `agusto`, `spetiembre`, `octubre`, `noviembre`, `diciembre`],
            fr: [`janvier`, `février`, `mars`, `avril`, `mai`, `juin`, `juillet`, `août`, `septembre`, `octobre`, `novembre`, `décembre`]
        },
        // Second (S)
        second: {
            en: [`zero`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`],
            es: [`cero`, `uno`, `dos`, `tres`, `cuatro`, `cinco`, `seis`, `siete`, `ocho`, `nueve`, `diez`, `once`, `doce`, `trece`, `catorce`, `quince`, `dieceseis`, `diecesiete`, `dieceocho`, `diecenueve`, `veinte`, `veintiuno`, `veintidós`, `veintitrés`, `veinticuatro`, `veinticinco`, `veintiséis`, `veintisiete`, `veintiocho`, `veintinueve`, `treinta`, `treinta y uno`, `treinta y dos`, `treinta y tres`, `treinta y cuatro`, `treinta y cinco`, `treinta y seis`, `treinta y siete`, `trienta y ocho`, `treinta y nueve`, `cuarenta`, `cuarenta y uno`, `curatenta y dos`, `cuarenta y trece`, `cuarenta y cuatro`, `cuarenta y cinco`, `cuarenta y seis`, `cuarenta y siete`, `cuarenta y ocho`, `cuarenta y nueve`, `cincuenta`, `cincuenta y uno`, `cincuenta y dos`, `cincuenta y trece`, `cincuenta y cuatro`, `cincuenta y cinco`, `cincuenta y seis`, `cincuenta y siete`, `cincuenta y ocho`, `cincuenta y nueve`],
            fr: [``, `une`, `deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `onze`, `douze`, `treize`, `quatorze`, `quinze`, `seize`, `dix-sept`, `dix-huit`, `dix-neuf`, `vingt`, `vingt et un`, `vingt-deux`, `vingt-trois`, `vingt-quatre`, `vingt-cinq`, `vingt-six`, `vingt-sept`, `vingt-huit`, `vingt-neuf`, `trente`, `Trente et un`, `Trente-deux`, `Trente-trois`, `Trente-quatre`, `Trente-cinq`, `Trente-six`, `Trente-sept`, `Trente-huit`, `Trente-neuf`, `quarante`, `quarante et un`, `quarante-deux`, `quarante-trois`, `quarante-quatre`, `quarante-cinq`, `quarante-six`, `quarante-sept`, `quarante-huit`, `quarante-neuf`, `cinquante`, `cinquante et un`, `cinquante-deux`, `cinquante-trois`, `cinquante-quatre`, `cinquante-cinq`, `cinquante-six`, `cinquante-sept`, `cinquante-huit`, `cinquante-neuf`]
        },
        // Year (Y)
        year: {
            en: {
                century: [``, `one hundred`, `two hundred`, `three hundred`, `four hundred`, `five hundred`, `six hundred`, `seven hundred`, `eight hundred`, `nine hundred`, `one thousand`, `eleven hundred`, `twelve hundred`, `thirteen hundred`, `fourteen hundred`, `fifteen hundred`, `sixteen hundred`, `seventeen hundred`, `eighteen hundred`, `nineteen hundred`, `two thousand`, `twenty one`],
                decade: [``, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twenty-one`, `twenty-two`, `twenty-three`, `twenty-four`, `twenty-five`, `twenty-six`, `twenty-seven`, `twenty-eight`, `twenty-nine`, `thirty`, `thirty-one`, `thirty-two`, `thirty-three`, `thirty-four`, `thirty-five`, `thirty-six`, `thirty-seven`, `thirty-eight`, `thirty-nine`, `fourty`, `fourty-one`, `fourty-two`, `fourty-three`, `fourty-four`, `fourty-five`, `fourty-six`, `fourty-seven`, `fourty-eight`, `fourty-nine`, `fifty`, `fifty-one`, `fifty-two`, `fifty-three`, `fifty-four`, `fifty-five`, `fifty-six`, `fifty-seven`, `fifty-eight`, `fifty-nine`, `sixty`, `sixty-one`, `sixty-two`, `sixty-three`, `sixty-four`, `sixty-five`, `sixty-six`, `sixty-seven`, `sixty-eight`, `sixty-nine`, `seventy`, `seventy-one`, `seventy-two`, `seventy-three`, `seventy-four`, `seventy-five`, `seventy-six`, `seventy-seven`, `seventy-eight`, `seventy-nine`, `eighty`, `eighty-one`, `eighty-two`, `eighty-three`, `eighty-four`, `eighty-five`, `eighty-six`, `eighty-seven`, `eighty-eight`, `eighty-nine`, `ninety`, `ninety-one`, `ninety-two`, `ninety-three`, `ninety-four`, `ninety-five`, `ninety-six`, `ninety-seven`, `ninety-eight`, `ninety-nine`]
            },
            es: {
                century: [``, `ciento`, `doscientos`, `trescientos`, `cuatrocientos`, `quinientos`, `seiscientos`, `setecientos`, `ochocientos`, `novecientos`, `mil`, `mil cien`, `mil doscientos`, `mil trescientos`, `mil cuatrocientos`, `mil quinientos`, `mil seiscientos`, `mil setecientos`, `mil ochocientos`, `mil novecientos`, `dos mil`, `dos mil cien`],
                decade: [``, `uno`, `dos`, `tres`, `cuatro`, `cinco`, `seis`, `siete`, `ocho`, `nueve`, `diez`, `once`, `doce`, `trece`, `catorce`, `quince`, `dieceseis`, `diecesiete`, `dieceocho`, `diecenueve`, `veinte`, `veintiuno`, `veintidós`, `veintitrés`, `veinticuatro`, `veinticinco`, `veintiséis`, `veintisiete`, `veintiocho`, `veintinueve`, `treinta`, `treinta y uno`, `treinta y dos`, `treinta y tres`, `treinta y cuatro`, `treinta y cinco`, `treinta y seis`, `treinta y siete`, `trienta y ocho`, `treinta y nueve`, `cuarenta`, `cuarenta y uno`, `curatenta y dos`, `cuarenta y trece`, `cuarenta y cuatro`, `cuarenta y cinco`, `cuarenta y seis`, `cuarenta y siete`, `cuarenta y ocho`, `cuarenta y nueve`, `cincuenta`, `cincuenta y uno`, `cincuenta y dos`, `cincuenta y trece`, `cincuenta y cuatro`, `cincuenta y cinco`, `cincuenta y seis`, `cincuenta y siete`, `cincuenta y ocho`, `cincuenta y nueve`, `sesenta`, `sesenta y uno`, `sesenta y dos`, `sesenta y trece`, `sesenta y cuatro`, `sesenta y cinco`, `sesenta y seis`, `sesenta y siete`, `sesenta y ocho`, `sesenta y nueve`, `setenta`, `setenta y uno`, `setenta y dos`, `setenta y trece`, `setenta y cuatro`, `setenta y cinco`, `setenta y seis`, `setenta y siete`, `setenta y ocho`, `setenta y nueve`, `ochenta`, `ochenta y uno`, `ochenta y dos`, `ochenta y trece`, `ochenta y cuatro`, `ochenta y cinco`, `ochenta y seis`, `ochenta y siete`, `ochenta y ocho`, `ochenta y nueve`, `noventa`, `noventa y uno`, `noventa y dos`, `noventa y trece`, `noventa y cuatro`, `noventa y cinco`, `noventa y seis`, `noventa y siete`, `noventa y ocho`, `noventa y nueve`]
            },
            fr: {
                century: [``, `cent`, `deux cents`, `trois cents`, `quatre cents`, `cinq cents`, `six cents`, `sept cents`, `huit cents`, `neuf cents`, `mille`, `mille cent`, `mille deux cents`, `mille trois cents`, `mille quatre cents`, `mille cinq cents`, `mille six cents`, `mille sept cents`, `mille huit cents`, `mille neuf cents`, `deux mille`, `deux mille cent`],
                decade: [``, `une`, `deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `onze`, `douze`, `treize`, `quatorze`, `quinze`, `seize`, `dix-sept`, `dix-huit`, `dix-neuf`, `vingt`, `vingt et un`, `vingt-deux`, `vingt-trois`, `vingt-quatre`, `vingt-cinq`, `vingt-six`, `vingt-sept`, `vingt-huit`, `vingt-neuf`, `trente`, `Trente et un`, `Trente-deux`, `Trente-trois`, `Trente-quatre`, `Trente-cinq`, `Trente-six`, `Trente-sept`, `Trente-huit`, `Trente-neuf`, `quarante`, `quarante et un`, `quarante-deux`, `quarante-trois`, `quarante-quatre`, `quarante-cinq`, `quarante-six`, `quarante-sept`, `quarante-huit`, `quarante-neuf`, `cinquante`, `cinquante et un`, `cinquante-deux`, `cinquante-trois`, `cinquante-quatre`, `cinquante-cinq`, `cinquante-six`, `cinquante-sept`, `cinquante-huit`, `cinquante-neuf`, `soixante`, `soixante et un`, `soixante-deux`, `soixante-trois`, `soixante-quatre`, `soixante-cinq`, `soixante-six`, `soixante-sept`, `soixante-huit`, `soixante-neuf`, `soixante-dix`, `soixante-et-onze`, `soixante-douze`, `soixante-treize`, `soixante-quatorze`, `soixante-quinze`, `soixante-seize`, `soixante-dix-sept`, `soixante-dix-huit`, `soixante-dix-neuf`, `quatre-vingts`, `quatre-vingt-un`, `quatre-vingt-deux`, `quatre-vingt-trois`, `quatre-vingt-quatre`, `quatre-vingt-cinq`, `quatre-vingt-six`, `quatre-vingt-sept`, `quatre-vingt-huit`, `quatre-vingt-neuf`, `quatre-vingt-dix`, `quatre-vingt-onze`, `quatre-vingt-douze`, `quatre-vingt-treize`, `quatre-vingt-quatorze`, `quatre-vingt-quinze`, `quatre-vingt-seize`, `quatre-vingt-dix-sept`, `quatre-vingt-dix-huit`, `quatre-vingt-dix-neuf`]
            }
        },
        // Meridian (m)
        meridian: {
            en: [`a m`, `p m`],
            es: [`de la mañana`, `de la tarde`],
            fr: [`du matin`, `du soir`]
        }
    };

    // Convert the date using new Date();
    const dateToFormat = new Date(date);
    const datePartsParsed = {
        DD: dateParts.day[settings.language][dateToFormat.getUTCDay()],
        MM: settings.military ? dateParts.minute[settings.language].military[dateToFormat.getUTCMinutes()] : dateParts.minute[settings.language].standard[dateToFormat.getUTCMinutes()],
        D: dateParts.date[settings.language][dateToFormat.getUTCDate() - 1],
        H: settings.military ? dateParts.hour[settings.language].military[dateToFormat.getUTCHours()] : dateParts.hour[settings.language].standard[dateToFormat.getUTCHours()],
        M: dateParts.month[settings.language][dateToFormat.getUTCMonth()],
        S: dateParts.date[settings.language][dateToFormat.getUTCSeconds()],
        Y: (() => {
            const year = `${dateToFormat.getUTCFullYear()}`;
            let century = dateParts.year[settings.language].century[parseInt(year.substr(0, 2))];
            let decade = dateParts.year[settings.language].decade[parseInt(year.substr(2, 3))];
            return `${century} ${decade}`;
        })(),
        m: settings.military ? '' : (dateToFormat.getUTCHours() >= 12) ? dateParts.meridian[settings.language][1] : dateParts.meridian[settings.language][0]
    };
    
    // Format the date based off of the format requested
    // The final replace is there because if a dateParsedPart doesn’t exist, then it
    // will place it in as an additional space. This removes that space.
    const datePartsParsedArray = Object.keys(datePartsParsed);
    const formatArray = settings.format.split(' ');
    return formatArray.map(datePart => {
        let datePartFormatted = datePart;
        for (let j = 0; j < settings.ignore.length; j++) {
            if (datePart.indexOf(settings.ignore[j]) !== -1) {
                return datePartFormatted;
            }
        }
        for (let i = 0; i < datePartsParsedArray.length; i++) {
            if (datePart.indexOf(datePartsParsedArray[i]) !== -1) {
                datePartFormatted = datePart.replace(datePartsParsedArray[i], datePartsParsed[datePartsParsedArray[i]]);
                break;
            }
        }
        return datePartFormatted;
    }).join(' ').replace('  ', ' ').trim();

};