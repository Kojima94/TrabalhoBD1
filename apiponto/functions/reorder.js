reorderString = (str) => {

    var arr = str.split('/');

    var dd = arr[0];
    var mm = arr[1];
    var aa = arr[2];

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${mm}/${dd}/${aa}`;
}

module.exports = reorderString;