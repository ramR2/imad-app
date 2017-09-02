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
           </div>`
    

};
var articleTwo={
    title:'jokes',
    content:`<div class="container">
<a href="/">Home</a>
<a href="/article-1">company profile</a>
<a href="/article-3">endpage</a>
<hr/>
<h1>enjoy few jokes</h1>


<p>Santa falls in luv with a nurse... After much thinking, he finally writes
a love letter to her: "I luv u sister."
*******************************************************<br>
Q: Why dogs don't marry?
A: Because they are already leading a dog's life!
*******************************************************<br>
Pappu, while filling up a form: Dad, what should I write against mother
tongue.?
Santa: Very long!
*******************************************************<br>
Teacher: Pappu, TAMSO MA JYOTIR GAMYA" shloka ka kya arth hai?
Pappu: Tum so jayo maa, mein Jyoti ke pass ja raha hoon.<br>
*******************************************************</p>
</div>`
};
var articleThree={
    title:'end page',
    content:`    <div class="container">
<a href="/">Home</a>
<a href="/article-1">company profile</a>
<a href="/article-2">jokes</a>
<hr/>
<h1>thanks for visiting</h1>
</div>`
    
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
  res.send(createTemplate(articleOne));
});
app.get("/article-2",function(req,res){
   res.send(createTemplate(articleTwo));
});
app.get("/article-3",function(req,res){
   res.send(createTemplate(articleThree));
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
