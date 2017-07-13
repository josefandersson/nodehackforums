/*
    Test functions that directly makes calls to the API.
    This test will do multiple requests to the server.
    Requires "chai" to be installed. (npm i -g chai)
    Application will crash if unsuccessful.
 */

const assert = require('chai').assert;

// === The API key to run tests with. ===
const apiKey = '';
// === The API key to run tests with. ===

const hfapi = require('../nodehackforums')(apiKey);

// Make sure exportation of module was successful
assert.isFunction(hfapi, 'nodehackforums should have returned a function.');

// Test set api key
function test_setApiKey() {
    hfapi.setApiKey(apiKey);
}

// Test test api key
function test_testApiKey() {
    hfapi.testApiKey((error, valid) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isTrue(valid, 'Valid should be true if API key is valid.');
    });
}

// Test get user
function test_getUser() {
    hfapi.getUser((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.equal(json.result.username, 'DrDoof', 'API call should have fetched the user "DrDoof" for userId 2240993.');
    }, 2240993);
}

// Test get users
function test_getUsers() {
    hfapi.getUsers((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isArray(json.uids, 'API call should have returned an array of users.');
        assert.isTrue(json.uids[2].success, 'API call should have successfully fetched three users.');
    }, [ 2240993, 1, 1800872 ]);
}

// Test get category
function test_getCategory() {
    hfapi.getCategory((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.equal(json.result.name, 'Hack Forums Official Information', 'API call should have successfully fetched info about category 1.');
    }, 1);
}

// Test get forum
function test_getForum() {
    hfapi.getForum((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.equal(json.result.name, 'HF API', 'API call should have successfully fetched info about forum 375. (The HF API subforum.)');
    }, 375);
}

// Test get thread
function test_getThread() {
    hfapi.getThread((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.equal(json.result.user, 2015410, 'API call should have successfully fetched creator of thread 5665556, which is user 2015410.');
    }, 5665556, true, 1);
}

// Test get post
function test_getPost() {
    hfapi.getPost((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.equal(json.result.uid, 2015410, 'API call should have successfully fetched author of post 5665556, which is user 2015410.');
    }, 54655887, true);
}

// Test get private message
function test_getPM() {
    hfapi.getPM((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isFalse(json.success, 'API call should NOT have been successful with an invalid PIM.');
    }, -1);
}

// Test get inbox
function test_getPMBox() {
    hfapi.getPMBox((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.isArray(json.result, 'API call should have fetched an array of PMs in inbox.');
    }, 0);
}

// Test get group
function test_getGroup() {
    hfapi.getGroup((error, json) => {
        assert.isNull(error, 'The request should not generate any errors.');
        assert.isObject(json, 'Response body should have been parsed into a JSON object.');
        assert.isTrue(json.success, 'API call should have been successful.');
        assert.equal(json.result.name, 'Red Lions', 'API call should have fetched the name of group 36, which is "Red Lions."');
    }, 36);
}

// Test get request count
function test_getRequestCount() {
    assert.isNumber(hfapi.getRequestCount(), 'Total request count should be a number.');
}




// ==     ==
// run tests
// ==     ==

let testsToRun = [

    test_testApiKey,
    test_getUser,
    test_getUsers,
    test_getCategory,
    test_getForum,
    test_getThread,
    test_getPost,
    test_getPM,
    test_getPMBox,
    test_getGroup,
    test_getRequestCount

][Symbol.iterator]();

// Only run one test per second to not get blocked
let intId = setInterval(() => {
    let testToRun = testsToRun.next();
    if (testToRun.done) {
        console.log('Done testing');
        clearInterval(intId);
    } else {
        console.log('Running', testToRun.value.name);
        testToRun.value();
    }
}, 1000);
