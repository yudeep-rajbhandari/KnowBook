/**
 * Created by USER on 2/8/2017.
 */
var express = require('express');
var router = express.Router();
var model = require('./../models/notes.js');
var subjectModel=require('./../models/subject');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});



router.post('/addnotes', function (req, res, next) {

    var addnewdata = new model(req.body.addnotes);
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
router.get('/Requests/:subjectid1', function (req, res, next) {
    // console.log(req.params.subjectid);
    console.log("hello");
    subjectModel.find({Subjectid:req.params.subjectid1})
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
