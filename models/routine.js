var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var routineSchema = new Schema({

 "Subjectid":{"type": Schema.Types.ObjectId,required:true, ref: 'subject'},
"startingTime":{"type":String},
"endingTime":{"type":String},
 "Teacher": {"type":String},
 "day":{"type":String}
});

module.exports=mongoose.model('routine',routineSchema);

