var express = require('express');
var router = express.Router();
var model = require('./../models/information.js');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

var information1 = {

    "faculty": "CE",
    "semester": "1st",
    "subject": "COMP201",
    "bookid": "585e08f5098886d618963221"
}

router.post('/savedata', function (req, res, next) {

    var addnewdata = new model(information1);
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

router.get('/faculty', function (req, res, next) {

    model.find().distinct('faculty', function (err, data) {

        if (err) {
            throw (err);
        }
        if (data) {
            res.status(200).json({ success: true, data: data })
        }
        else {
            next(err);
        }
    })
})



module.exports = router;