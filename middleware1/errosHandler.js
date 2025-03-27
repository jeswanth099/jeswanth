
const {logEvent}= require('./logEvents');

const errosHandel=(err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errorlog.txt');
    console.log(err.stack)
    res.status(500).send(err.message);
    next()
}
module.exports=errosHandel;