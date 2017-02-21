/**
 * Created by USER on 2/8/2017.
 */
var express = require('express');
var router = express.Router();
var model = require('./../models/pastquestion.js');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/Requestsubject', function (req, res, next) {
    // console.log(req.params.subjectid);
    console.log("hello");
    subjectModel.find({Faculties:req.query.Faculty,Semester:req.query.Semester})
        .exec(function (err, data) {
            var subjectIds=data.map(val=>{
                return val._id;
            })
            model.find({Subjectid:{$in:subjectIds}}).populate('Subjectid').exec(function (err,data) {
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
})

router.post('/addquestion', function (req, res, next) {

    var addnewdata = new model(req.body.addquestion);
    addnewdata.save(function (err, data) {
        if (err) {
            throw (err);
        }
        if (!err) {
            res.status(200).json({ success: true, data: data })
        }
        else {
            next(err);
        }
    })
})

router.get('/getquestion', function (req, res, next) {
    // console.log(req.params.subjectid);

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
router.get('/Requests/:subjectid2', function (req, res, next) {
    // console.log(req.params.subjectid);
    console.log("hello");
    model.find({Subjectid:req.params.subjectid2})
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
router.post('/delete',function(req,res,next){
    console.log(req.body.deleteItem);
    model.remove({_id:req.body.deleteItem},function(err,data){
        if(err){
            throw(err);
        }
        if(!err){
            res.status(200).send({message:'successfully deleted'})
        }
    })
})


router.get('/faculty', function (req, res, next) {
    model.find({},function(err,data){
        if(err){
            throw (err);
        }
        if(!err){
            res.status(200).json({success:true,data:data})
        }
    })


})



module.exports = router;

