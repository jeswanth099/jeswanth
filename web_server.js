const express=require('express')
const app = express()
const path=require('path')
const cors =require('cors')
const corsOptions = require('./config/corsOption')
const logEvent = require('./middleware1/logEvents.js')
const errosHandel=require('./middleware1/errosHandler.js')
const PORT=process.env.PORT|| 3500;
// custom middleware
app.use ((req,res,next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next()
})
app.use(cors(corsOptions))

// bulid in middleware
app.use(express.urlencoded({extended:false}))// url encoded middleware for to  use user data
app.use(express.json())// to handle json files
app.use('/',express.static(path.join(__dirname,'./public')))//to access public folder
app.use('/subdir',express.static(path.join(__dirname,'./public')))
 // routes
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
app.use('/employees',require('./routes/api/employees'))
// custom middleware
app.use ((req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    next()
})
/*app.get('/hello(.html)?',(req,res,next)=>
{console.log('hello.html page loadeding'); 
next();},
(res,req,next)=>{console.log('hello page')})
const one=(req,res,next)=>{
    console.log('one');
    next();
}
const two=(req,res,next)=>{
    console.log('two');
    next();
}
const three=(req,res,)=>{
    console.log('one');
    res.send('Finished')   
}
app.get('/chain(.html)?',[one,two,three])*/
app.get('/*',(req,res)=>
{res.status(404).sendFile(path.join(__dirname,'views','404.html'));}
)
app.all('*',(req,res)=>{
res.status(404);
if(req.accepts('html')){
    res.sendFile(path.jont(__dirname,'views','404.html'));
}else if(req.accepts('json')){
    res.json({"erroe":"404 not Found"});
}else
{
    res.type('txt').send('404 not Found')
}
})
app.use(errosHandel)
app.listen(PORT,() => console.log(`server running on port ${PORT}`));
