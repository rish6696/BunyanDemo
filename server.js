const express=require('express');
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.listen(4587,()=>{
    console.log("server started");
})


    var bunyan = require('bunyan');
    var Elasticsearch = require('bunyan-elasticsearch');
    var esStream = new Elasticsearch({
    type: 'logs',
    host: 'localhost:9200',
    index:(a)=>{
        
        return a.projectHash;

    }
});
esStream.on('error', function (err) {
  console.log('Elasticsearch Stream Error:', err.stack);
});

var logger = bunyan.createLogger({
  name: "My Application",
  streams: [
    { stream: process.stdout },
    { stream: esStream }
  ],
  serializers: bunyan.stdSerializers
});

logger.info({
    projectHash:"rzyhfhjjb",
    text: "hello world"
})
