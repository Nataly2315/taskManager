const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
      },
    openId: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        
    }});


module.exports = model('User', schema);


