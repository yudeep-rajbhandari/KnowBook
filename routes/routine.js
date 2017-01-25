var express = require('express');
var router = express.Router();
var model = require('./../models/routine.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'oi ashchal knowbook deploy bhayo' });
});

router.get('/test', function(req, res, next) {
  res.json({message:"this is done"})
});





router.get('/Edithandler/:routineid',function(req,res,next){


    model.findOne({_id:req.params.routineid})
        .populate('Subjectid').
    exec(function(err,data){

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


router.post('/addroutine',function(req,res,next){

    var addnewdata=req.body.routine;
    console.log(addnewdata);
    var addthis = new model(addnewdata);

    var addnew= new model(addnewdata);
            addnew.save(function(err,data){
                     if (err) {
            throw (err);
        }
        if (!err) {
            res.status(200).json({data:'successfully added'})
        }
        else {
            next(err);
        }
            })
        })


 /*       router.get('/getroutines1', function (req, res, next) {
   // console.log(req.params.subjectid);
    console.log("hello");
    model.find({})
    .populate('Subjectid').exec(function (err, data) {

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
        })*/

router.get('/getroutine', function (req, res, next) {
        console.log(req.query);
        console.log("<<<<<<");
    model.find({}).populate('Subjectid').exec(function (err, data) {
        
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

router.post('/deleteone',function(req,res,next){
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


module.exports = router;
