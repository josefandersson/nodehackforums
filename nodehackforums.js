const cloudscraper = require('cloudscraper');

// private modules
const RequestCounter = require('./lib/RequestCounter');
const Utils = require('./lib/Utils');



/**
 * The base64 encoded user:password that is sent as a authorization header with every request.
 * @type {String}
 */
let authorization;



const _API_URL_BASE = 'https://hackforums.net/api/v1';
const _REQUEST_OPTIONS = {
    method:'GET',
    url:_API_URL_BASE,
    headers: {
        authorization: 'Basic ' + authorization
    }
};



/**
 * Make a cloudscraper request.
 * @param  {Object}   options  Object passed to request. See https://www.npmjs.com/package/request#custom-http-headers
 * @return {Promise}  Javascript promise is returned, resolved if no error, rejected if error provided. INVALID_API_KEY is possible.
 */
function makeRequest(options) {
    var promise = new Promise(function(resolve, reject) {
        cloudscraper.request(options, (error, response, body) => {
            let jsonOut;

            if (!error) {
                jsonOut = JSON.parse(body);
                if (jsonOut.message !== 'INVALID_API_KEY') {
                    RequestCounter.add();
                    resolve(jsonOut);
                }else{
                    reject('INVALID_API_KEY');
                }
            }else{
                reject(error);
            }
        });
    });

    return promise;
}



/**
 * Change the API key to be used with requests. Also encodes API key to base64, which is what is sent as authorization header with requests.
 * @param {string} apiKey The new API key.
 */
function setApiKey(apiKey) {
    authorization = new Buffer(apiKey + ':').toString('base64');
    _REQUEST_OPTIONS.append({
        headers: { authorization: 'Basic ' + authorization }
    }, 1);
}



/**
 * @return {Integer} The total count of requests sent in the last hour (or since the application started).
 */
function getRequestCount() {
    return RequestCounter.count();
}



/**
 * Sends an empty request to the API to check if the current API key is valid.
 */
function testApiKey() {
    return makeRequest(_REQUEST_OPTIONS);
}



/**
 * Gets info about a user.
 * @param  {Number}   userId   A user's ID.
 */
function getUser(userId) {
    let url = `${_API_URL_BASE}/user/${userId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets an array of users info.
 * @param  {String}   userIds  Users ID's seperated by comma. (or an array of user ID's)
 */
function getUsers(userIds) {
    let userIdsString = userIds;
    if (userIds instanceof Array) {
        userIdsString = userIds.join(',');
    }

    let url = `${_API_URL_BASE}/users/${userIdsString}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets info about a forum category and an array of forums in that cateory.
 * @param  {Number}   categoryId A category's ID.
 */
function getCategory(categoryId) {
    let url = `${_API_URL_BASE}/category/${categoryId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets info about a forum and an array of threads in that forum.
 * @param  {Number}   forumId  A forum's ID.
 */
function getForum(forumId) {
    let url = `${_API_URL_BASE}/forum/${forumId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets info about a thread and it's posts, including the content of posts.
 * @param  {Number}   threadId    A thread's ID.
 * @param  {Boolean}  raw         Whether to fetch all posts content as raw MyBB instead of parsed HTML.
 * @param  {Number}   page        Which page of the thread to fetch posts from.
 */
function getThread(threadId, raw=false, page=0) {
    let params = `?page=${page}`;
    if (raw === true) {
        params += '&raw';
    }

    let url = `${_API_URL_BASE}/thread/${threadId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets info and content of a post.
 * @param  {Number}   postId      A post's ID.
 * @param  {Boolean}  [raw=false] Whether to fetch post content as raw MyBB instead of parsed HTML.
 */
function getPost(postId, raw=false) {
    let params = '';
    if (raw === true) {
        params = '?raw';
    }

    let url = `${_API_URL_BASE}/post/${postId}${params}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Reads a PM. (Note: PM will be marked as read just like reading it on hackforums.)
 * @param  {Number}   pmId     A private message's ID.
 */
function getPrivateMessage(pmId) {
    let url = `${_API_URL_BASE}/pm/${pmId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets an array of messages in a message box.
 * @param  {Number}   boxId    A message box's ID.
 */
function getPrivateMessageBox(boxId) {
    let url = `${_API_URL_BASE}/pmbox/${boxId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * Gets info about a group.
 * @param  {Number}   groupId  A group's ID.
 */
function getGroup(groupId) {
    let url = `${_API_URL_BASE}/group/${groupId}`;
    return makeRequest(_REQUEST_OPTIONS.append({ url:url }, 1));
}



/**
 * The object which will be exported as the nodehackforums module. All other functions are assigned to this object.
 * @param       {String} apiKey A hackforums API key.
 * @return      {Object}        Itself.
 */
function _nodehackforums(apiKey) {
    setApiKey(apiKey);
    return _nodehackforums;
}

// assign functions to _nodehackforums and export module
_nodehackforums.setApiKey = setApiKey;
_nodehackforums.testApiKey = testApiKey;
_nodehackforums.getCategory = getCategory;
_nodehackforums.getRequestCount = getRequestCount;
_nodehackforums.getUser = getUser;
_nodehackforums.getUsers = getUsers;
_nodehackforums.getForum = getForum;
_nodehackforums.getThread = getThread;
_nodehackforums.getPost = getPost;
_nodehackforums.getPrivateMessage = getPrivateMessage;
_nodehackforums.getPM = _nodehackforums.getPrivateMessage; // alias function
_nodehackforums.getPrivateMessageBox = getPrivateMessageBox;
_nodehackforums.getPMBox = _nodehackforums.getPrivateMessageBox; // alias function
_nodehackforums.getGroup = getGroup;

_nodehackforums.RequestCounter = RequestCounter;

module.exports = _nodehackforums;
