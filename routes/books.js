var express = require('express');
var router = express.Router();
var model = require('./../models/books.js');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

var book1={
    "bookName":"new book",
    "booktype":"refernce",
    "writer":"new",
    "publication":"new publication",
    "price":"Nrs.500",
    "availability":"N/A",
    "rackNumber":"23"
}

router.post('/savedata',function(req,res,next){

        var addnew= new model(book1);
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




module.exports = router;