const mongoose = require('mongoose');

async function initmongo() {
    try {
        let DB = await mongoose.connect("mongodb+srv://Admin:1kRAaBVZypQ78ckJ@cluster0-hhboy.mongodb.net/test?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,

        });
    } catch (e) {
        console.error(e);
    }
};

initmongo();