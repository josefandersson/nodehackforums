const cloudscraper = require('cloudscraper');
require('./lib/Utils');
const RequestCounter = require('./lib/RequestCounter');

let authorization;

const apiUrlBase = 'https://hackforums.net/api/v1';

const _REQUEST_OPTIONS = {
    method:'GET',
    url:apiUrlBase,
    headers: { authorization: 'Basic ' + authorization }};

const Functions = {};


Functions.setApiKey = function setApiKey(apiKey) {
    authorization = new Buffer(apiKey + ':').toString('base64');
    _REQUEST_OPTIONS.append({
        headers: { authorization: 'Basic ' + authorization }
    }, 1);
};


function makeRequest(callback, options) {
    cloudscraper.request(options, (error, response, body) => {
        let jsonOut;

        if (!error) {
            jsonOut = JSON.parse(body);
            if (jsonOut.message !== 'INVALID_API_KEY') {
                RequestCounter.add();
            }
        }

        callback(error, jsonOut);
    });
}


Functions.getRequestCount = function getRequestCount() {
    return RequestCounter.count();
};


Functions.testApiKey = function testApiKey(callback) {
    makeRequest(
        (error, json) => {
            let valid = false;
            if (json && json.message !== 'INVALID_API_KEY') {
                valid = true;
            }

            callback(error, valid);
        },
        _REQUEST_OPTIONS);
};


Functions.getUser = function getUser(callback, userId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/user/${userId}` }, 1));
};


Functions.getUsers = function getUsers(callback, userIds) {
    let userIdsString = userIds;
    if (userIds instanceof Array) {
        userIdsString = userIds.join(',');
    }

    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/users/${userIdsString}` }, 1));
};


Functions.getCategory = function getCategory(callback, categoryId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/category/${categoryId}` }, 1));
};


Functions.getForum = function getForum(callback, forumId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/forum/${forumId}` }, 1));
};


Functions.getThread = function getThread(callback, threadId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/thread/${threadId}` }, 1));
};


Functions.getPost = function getPost(callback, postId, raw=false) {
    let params = '';
    if (raw === true) {
        params = '?raw';
    }

    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/post/${postId}${params}` }, 1));
};


Functions.getPrivateMessage = function getPrivateMessage(callback, pmId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/pm/${pmId}` }, 1));
};
Functions.getPM = Functions.getPrivateMessage;


Functions.getPrivateMessageBox = function getPrivateMessageBox(callback, boxId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/pmbox/${boxId}` }, 1));
};
Functions.getPMBox = Functions.getPrivateMessageBox;


Functions.getGroup = function getGroup(callback, groupId) {
    makeRequest(
        callback,
        _REQUEST_OPTIONS.append({ url:`${apiUrlBase}/group/${groupId}` }, 1));
};

module.exports = function init(apiKey) {
    Functions.setApiKey(apiKey);
    return Functions;
};
