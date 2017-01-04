var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var subjectSchema = new Schema({

"subjectcode":{"type":String},
"SubjectName":{"type":String},
"Credit":{"type":String},
"Faculties":{"type":String},
"Semester":{"type":String},
"picture": {"type": Schema.Types.Mixed, required: true},
    "morePictures": Schema.Types.Mixed
 
});

module.exports=mongoose.model('subject',subjectSchema);
