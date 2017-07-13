/**
 * The time in milliseconds during which a request will affect the request rate limit. This will probably always be an hour (1000*60*60ms).
 * @type {Number}
 */
const _REQUEST_TIME_UNTIL_IRRELEVANT = 3600000;

/**
 * An array of timestamps (in millis) for sent requests. Timestamps are stored to calculate how many of the made requests affects the request rate limit.
 * @type {Array}
 */
let sentRequests = [];


/**
 * Register that a request was sent by saving the current time in millis.
 */
function add() {
    sentRequests.push(Date.now());
    trimOld();
}


/**
 * Trims the requests array before returning, to make sure count is accurate.
 * @return {Number} The number of requests new enough to affect the rate limit.
 */
function count() {
    trimOld();
    return sentRequests.length;
}


/**
 * @return {Number} The timestamp (in millis) of the latest request sent. If no requests has been noted, -1 is returned.
 */
function latestRequest() {
    let latest = -1;
    if (0 < sentRequests.length) {
        latest = sentRequests[sentRequests.length-1];
    }
    return latest;
}


/**
 *  Remove requests from request array that are old enough to not affect the request rate limit.
 */
function trimOld() {
    let tooOldToMatter = Date.now() - _REQUEST_TIME_UNTIL_IRRELEVANT;
    var lastIndex;
    for (var i = sentRequests.length; 0 < i; i--) {
        if (sentRequests[i] < tooOldToMatter) {
            lastIndex = i;
            break;
        }
    }
    sentRequests.splice(0, lastIndex+1);
}



/**
 * Reset the counter.
 */
function reset() {
    sentRequests = [];
}


module.exports = { add:add, count:count, latestRequest:latestRequest, reset:reset };
