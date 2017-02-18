var express = require('express');
var router = express.Router();
var model = require('./../models/books.js');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

var book1={
    "bookName":"Control System And Instrumentation",
    "booktype":"refernce",
    "writer":"new writer",
    "publication":"new publication",
    "price":"Nrs.500",
    "availability":"N/A",
    "rackNumber":"N/A"
}

router.post('/savedata',function(req,res,next){

    var addnewdata=req.body.addBook;
    var addthis = new model(addnewdata);

    var addnew= new model(addnewdata);
            addnew.save(function(err,data){
                     if (err) {
            throw (err);
        }
        if (!err) {
            res.status(200).json({success: true, data: data})
        }
        else {
            next(err);
        }
            })
        })


router.get('/Requests/:subjectid', function (req, res, next) {
   // console.log(req.params.subjectid);
    console.log("hello");
    model.find({Subjectid:req.params.subjectid})
    .populate('Subjectid')
    .exec(function (err, data) {

        if (err) {
            throw (err);
        }
        if (data) {
            res.status(200).json({ success: true, data: data })
            console.log(data);
        }
        else {
            next(err);
        }
    })
})

router.get('/Request1/:subjectcode', function (req, res, next) {
    // console.log(req.params.subjectid);
    console.log("hello");
    model.find({Subjectid:req.params.subjectid})
        .populate('Subjectid')
        .exec(function (err, data) {

            if (err) {
                throw (err);
            }
            if (data) {
                res.status(200).json({ success: true, data: data })
                console.log(data);
            }
            else {
                next(err);
            }
        })
})
router.get('/Request2', function (req, res, next) {
    // console.log(req.params.subjectid);
    console.log("hello from the other side");
    model.find({})
        .populate('Subjectid')
        .exec(function (err, data) {

            if (err) {
                throw (err);
            }
            if (data) {
                res.status(200).json({ success: true, data: data })
                console.log(data);
            }
            else {
                next(err);
            }
        })
})

router.get('/Edithandler/:bookid',function(req,res,next){
    

    model.findOne({_id:req.params.bookid})
        .populate('Subjectid')
        .exec(function(err,data){

        if(err){
            throw(err);
        }
if(!err){

    res.status(200).json({success:true,data:data})
    console.log(data);
}    
else{
    next(err);
}

})
})

router.post('/delete',function(req,res,next){
console.log(req.body.deleteItem);
    model.remove({_id:req.body.deleteItem},function(err,data){
        if(err){
            throw(err);
        }
         if(!err){
        res.status(200).json({message:'successfully deleted'})
    }
})
})

router.post('/update',function(req,res,next) {
    console.log(req.body.updatedata);
    model.findByIdAndUpdate(req.body.updatedata._id, {$set: req.body.updatedata}, {new: true}, function (err, tank) {
        if (err) {
            throw (err);
        }
        if (!err) {
            res.status(200).json({message: 'successfully deleted'})
        }

    })

})




module.exports = router;