const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    executor: {
        type: String,
    },
    time: {
        type: Date,
    },
    comment: {
        type: String,
    }

});

module.exports = model('User', schema);


