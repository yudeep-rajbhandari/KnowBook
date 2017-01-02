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


router.get('/Requests', function (req, res, next) {

    console.log("<<<<<<");
    model.find({}, function (err, data) {

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