/**
 * Created by USER on 2/8/2017.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var pastquestionSchema = new Schema({

    "Subjectid":{"type": Schema.Types.ObjectId,required:true, ref: 'subject'},
    "Year":{"type":String},
    "Types":{"type":String},

    "pdf": {"type": Schema.Types.Mixed, required: true},
    "morePdfs": Schema.Types.Mixed
});

module.exports=mongoose.model('pastquestion',pastquestionSchema);
