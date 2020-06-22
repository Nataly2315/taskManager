const {Schema, model} = require('mongoose');

const schema = new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    executor: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
    ,
    time: {
        type: String,
    },
    comment: {
        type: String,
    }

});

module.exports = model('Task', schema);


