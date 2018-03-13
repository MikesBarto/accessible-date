# accessible-date

**accessible-date** is an npm module that creates readable, accessible dates for screen readers. These dates are returned in Coordinated Universal Time (UTC). Screen readers have a hard time deciphering what is and isn’t a date in HTML. For example, if a screen reader comes across the following timestamp:

```
<time id="timestamp" datetime="2001-05-15T19:30">May 15, 2001 - 7:30pm</time>
```

… the screen reader will read it as the following:

> May one five, two zero zero one, seven three zero p m

*accessible-date* can change the format of a timestamp into something readable:

> Tuesday, May fifteenth, two-thousand one at seven thirty p m

*accesible-date* can also process dates into military time as well:

> Tuesday, May fifteenth, two-thousand one at zero seven thirty

## Installation

You can install the module through npm:

```
npm install accessible-date --save
```

Then just require the module into your JavaScript file, and give it a timestamp and a settings object hash of options:

```
const accessibleDate = require('accessible-date');
const timestampElem = document.getElementById('timestamp');
const newAccessibleDate = accessibleDate(timestampElem.getAttribute('datetime'), {
    format: `DD, M D, Y at H MM m`,
    military: false
});
```

Then, you can assign that date as, for example, an `aria-label` to a `<time>` element:

```
timestampElem.setAttribute('aria-label', newAccessibleDate);
```

You will end up with a time attribute like this:

```
<time id="timestamp" datetime="2001-05-15T19:30" aria-label="Tuesday, May fifteenth, two-thousand one at seven thirty p m">May 15, 2001 - 7:30pm</time>
```
    
## Parameters and Options

*accessible-date* takes two parameters: a timestamp and a settings object hash.

The timestamp needs to be in one of the following formats:

```
2001-05-15T19:30
2018-05-15T19:30:00Z
2018-05-31T07:30:00-02:00
2015-03-25
Wed Mar 25 2015 09:56:24 GMT+0100 (W. Europe Standard Time)
```

The settings object hash takes the following methods:

`settings.format` - ***required***
How the returned string is formatted. You can use any combination of the following values:
- `DD` - Day (ex: “Sunday,” “Monday,” etc)
- `MM` - Minute (ex: “Twelve,” “Thirteen,” etc)
- `M` - Month (ex: “January,” “February,” etc)
- `D` - Date (ex: “First,” “Second,” etc)
- `Y` - Year (ex: “Two thousand seventeen,” “Two thousand eighteen,” etc)
- `H` - Hour (ex: “Eleven,” “Twelve,” etc)
- `S` - Second (ex: “Twenty-eight,” “Twenty-nine,” etc)
- `m` - Meridian (ex: “A M,” “P M”)

`settings.military` - ***default*** `false`
If set to `true`, date will display in military time. Otherwise, it defaults to displaying in standard time.
