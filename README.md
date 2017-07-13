# nodehackforums
###### *Gateway to the HackForums.net API for NodeJS.*
#
---

### Installation
```
npm install nodehackforums
```

### Usage
```
var hfapi = require('nodehackforums')('<YOUR_API_KEY>');
```
Replace `<YOUR_API_KEY>` with your API key.

---
# Documentation
### Test api key
Send an empty request to the API server to check if provided API key is valid. (The `<YOUR_API_KEY>` from [Usage](#usage).)
```
hfapi.testApiKey(callback);
```
Callback gets passed two arguments, error and valid.
```
function callback(error, valid) {
    if (error) throw new Error(error); // something went wrong with request
    if (valid === true) {
        // API key is valid.
    }
}
```

### Set API key
Set a new API key. Makes it possible to switch "user" mid-execution. It is recommended to [test the API key](#test-api-key) before continuing with other requests after using this method.
```
hfapi.setApiKey(apiKey);
```

### Get request count
Get the number of requests sent from this session in the last hour.
__NOTE: this may not not be the total amount of request sent with your API key if you have used your API key elsewhere. Nor does this function reset when a new API key is set. It is however the total amount of requests sent since the start of the application.__
```
hfapi.getRequestCount(); // returns count
```

### Get user
Gets info about a user.
```
hfapi.getUser(callback, userId);
```
Where `userId` is the user's UID. Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get users
Gets info about multiple users.
```
hfapi.getUsers(callback, userIds);
```
Where `userIds` is an array of UID's or a string of UID's seperated by comma(,). Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get category
Gets info about the subforums inside the different forum categories. (Category eg. common, hack, tech,...)
```
hfapi.getCategory(callback, categoryId);
```
Where `categoryId` is the category's ID. Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get forum
Gets info about a subforum and it's threads.
```
hfapi.getForum(callback, forumId);
```
Where `forumId` is the subforum's ID. Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get thread
Gets info about a thread and it's posts.
```
hfapi.getThread(callback, threadId [,raw, page]);
```
Where `threadId` is the thread's ID. If `raw` is true, thread content will not be parsed into HTML but remain as MyBB. `page` is the page of the thread to fetch posts from.  Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get post
Gets info about a post.
```
hfapi.getPost(callback, postId [,raw]);
```
Where `postId` is the post's ID. If `raw` is true, post content will not be parsed into HTML but remain as MyBB. Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get private message
Reads a PM. (__Note: PM will be marked as read just like reading it on HackForums.__)
```
hfapi.getPrivateMessage(callback, pmId);
// or
hfapi.getPM(callback, pmId);
```
Where `pmId` is the PM's ID. Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get private message box
Gets an array of messages in an inbox.
```
hfapi.getPrivateMessageBox(callback, boxId);
// or
hfapi.getPMBox(callback, boxId);
```
Where `boxId` is the box's ID. (The "fid" in the URL when clicking a PM box in user CP.) Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.

### Get group
Gets info about a group.
```
hfapi.getGroup(callback, groupId);
```
Where `groupId` is the group's ID. Callback get passed two arguments, `error` and `json`. `json` is the response body parsed to a JSON object.
