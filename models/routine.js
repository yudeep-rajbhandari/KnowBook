var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var routineSchema = new Schema({

 "Subjectid":{"type": Schema.Types.ObjectId,required:true, ref: 'subject'},
"starting time":{"type":String},
"ending time":{"type":String},
 "Teacher": {"type":String}
});

module.exports=mongoose.model('routine',routineSchema);

