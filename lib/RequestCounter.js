let sentRequests = [];

const Functions = {};


Functions.add = function add() {
    sentRequests.push(Date.now());
    Functions.trimOld();
};

Functions.trimOld = function trimOld() {
    let oneHourAgo = Date.now() - 3600000;
    var lastIndex;
    for (var i = sentRequests.length; 0 < i; i--) {
        if (sentRequests[i] < oneHourAgo) {
            lastIndex = i;
            break;
        }
    }
    sentRequests.splice(0,lastIndex+1);
};

Functions.count = function count() {
    Functions.trimOld();
    return sentRequests.length;
};


module.exports = Functions;
