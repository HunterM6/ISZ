var config = require('../../config.js');
var watson = require('watson-developer-cloud');

module.exports = {
  watsonConversationSendMessage
  // getEvents, getEvent, addEvent to ADD export funtions!!
};

var conversation = watson.conversation({
  username: config.watsonConversationUsername,
  password: config.watsonConversationPassword,
  version: 'v1',
  version_date: '2017-05-26'
});

function watsonConversationSendMessage(userInput, callback) {
  conversation.message({
    workspace_id: config.watsonWorkspaceID,
    input: {
      'text': userInput
    }
  }, function(err, response) {
    if (err){
      console.log('error:', err);
      callback(err);
    }else{
      console.log(JSON.stringify(response, null, 2));
      callback(response);
    }
  });
};
