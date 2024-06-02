const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/test-zalo", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
          retryWrites: true,
        });

        console.log('Connect success');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };
