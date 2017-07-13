### Changelog

##### v 1.1.x
Restructured nodehackforums.js. Users are now not required to call nodehackforums as a function before use but use setApiKey to set API key instead.

Exports `RequestCounter` for users to access functions directly. Needed for future functionality such as setting handlers for when there are too many requests.
Available functions from `RequestCounter` are:
add
count
latestRequest
reset

##### v 1.0.x
Added functions for all different API calls.
setApiKey
testApiKey
getUser
getUsers
getCategory
getForum
getThread
getPost
getPrivateMessage / getPM
getPrivateMessageBox / getPMBox
getGroup

Added `RequestCounter` to track total amount of requests made within the hour to not get throttled.
getRequestCount
