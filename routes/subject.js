var express = require('express');
var router = express.Router();
var model = require('./../models/subject.js');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/savedata', function (req, res, next) {

    
    console.log(req.body);
    var addnewdata=req.body.addSubject;
    



        var addthis = new model(addnewdata);
        addthis.save(function(err,data) {
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
    router.get('/getsubject', function (req, res, next) {
        console.log(req.query);
        console.log("<<<<<<");
    model.find({Faculties:req.query.Faculty,Semester:req.query.Semester}, function (err, data) {
        
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


    


 


module.exports = router;