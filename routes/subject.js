var express = require('express');
var router = express.Router();
var model = require('./../models/subject.js');
var booksmodel = require('./../models/books.js');
var notesmodel = require('./../models/notes.js');
var routinemodel = require('./../models/routine.js');
var pastquestionmodel = require('./../models/pastquestion.js');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/deletesubject', function (req, res, next) {
    var query={Subjectid: req.body.deletesubject};
    var tasks = [new Promise((resolve, reject) => {
        model.remove({_id: req.body.deletesubject},promiseResponse(resolve, reject))
    }), new Promise((resolve, reject) => {
        booksmodel.remove(query, promiseResponse(resolve, reject))
    }), new Promise((resolve, reject) => {
        notesmodel.remove(query,promiseResponse(resolve, reject))
    }), new Promise((resolve, reject) => {
        routinemodel.remove(query, promiseResponse(resolve, reject))
    }), new Promise((resolve, reject) => {
        booksmodel.remove(query, promiseResponse(resolve, reject))
    }), new Promise((resolve, reject) => {
        pastquestionmodel.remove(query, promiseResponse(resolve, reject))
    })];

    Promise.all(tasks).then(val => {
            res.status(200).json(true)

        }, reason => {
            res.status(401).json(reason);
        }
    );



    function promiseResponse(resolve, reject) {
        return function (err, data) {
            if (!err) {
                resolve()
            } else {
                reject(err)
            }
        }

    }

})

router.post('/savedata', function (req, res, next) {


    console.log(req.body);
    var addnewdata = req.body.addSubject;


    var addthis = new model(addnewdata);
    addthis.save(function (err, data) {
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
    //{ Faculty: 'CS', Semester: '2' }
    if(req.query.Faculty=='CS'&& (req.query.Semester=='1'||req.query.Semester=='2'||req.query.Semester=='3'||req.query.Semester=='4'||req.query.Semester=='8')){
        req.query.Faculty='CE';
    }



    console.log(req.query.Faculty);

    model.find({Faculties: req.query.Faculty, Semester: req.query.Semester}, function (err, data) {

        if (err) {
            throw (err);
        }
        if (data) {
            res.status(200).json({success: true, data: data})
            //console.log(data);
        }
        else {
            next(err);
        }
    })
})


module.exports = router;