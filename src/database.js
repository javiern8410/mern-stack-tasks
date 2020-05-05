const mongoose = require('mongoose');

// const URI = 'mongodb://localhost/mern-tasks';

// const URI = 'mongodb://javiern8410:Asdfghj123*@cluster0-vbmcs.mongodb.net/test?retryWrites=true&w=majority';

const URI =  'mongodb://javiern8410:Asdfghj123*@cluster0-shard-00-00-vbmcs.mongodb.net:27017,cluster0-shard-00-01-vbmcs.mongodb.net:27017,cluster0-shard-00-02-vbmcs.mongodb.net:27017/mern-tasks?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 

module.exports = mongoose;