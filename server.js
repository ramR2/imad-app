var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne={
    title : 'Articleone',
    content: `<div class="container"> 
        <a href="/">Home</a> 
        <a href="http://ramrajani.imad.hasura-app.io/article-2">jokes</a>
        <a href="/article-3">end page </a>
        <hr/>
                     <div class="center text-big bold">
           <h2>  R-SQUARE corporation</h2>
            
           
                </div>
      
        
       <div></div> <h2>Founder & CEO -Ram Rajani</h2>
        <h3>Grow ur business with us:):)</h3>
        <p>we have hired fb and twitter  :):)</p>
           </div>`,
    

};
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/article-1',function(req,res){
  res.sendFile(createTemplate(articleOne));
});
app.get("/article-2",function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-2.html'));
});
app.get("/article-3",function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-3.html'));
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
