var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'	ramrajani',
    database:'	ramrajani',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

function createTemplate(data){
    var title=data.title;
    var content=data.content;
var htmltemplate=`<!doctype html>
<html>
    <head>
      <title>${title}</title> 
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body >
       ${content}
    </body>
</html>`;
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/patatap',function(req,res){
    res.sendFile(path.join(__dirname,'ui','circles.html'));
});
var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM article',function(req,res){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(Json.stringify(result));
        }
    } );
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/articles/:articleName',function(req,res){
    var articleName=req.params.articleName;
   
    pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'",function(err,result){
         var articleData=result.rows[0];
       if(err)
       {
           res.send(500).send(err.toString());
       }
       else
       {
           if(result.rows.length===0)
           {
               res.status(404).send('Article not found');
               
           }
           else
           {
               
               res.send(createTemplate(articleData));
           }
       }
    });
  res.send(createTemplate(articleData));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
