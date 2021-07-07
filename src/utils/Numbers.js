export const abbreviateNumber = (value) => {
    let newValue = value;
    if (value >= 1000) {
        const suffixes = [
            "",
            "Thousand",
            "Million",
            "Billion",
            "Trillion",
            "Quadrillion",
            "Quintillion",
            "Nonillion",
            "Decillion",
            "Googol",
            "Centillion",
            "Googolplex",
        ];
        const suffixNum = Math.floor( ("" + value).length/3 );
        let shortValue = '';
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue + " " +suffixes[suffixNum];
    }
    return newValue;
}

export const truncateFloat = function(value, precision) {
    let pMult = 1.0;
    while (precision--) {
        pMult *= 10;
    }
    return ((value * pMult) >> 0) / pMult;
}