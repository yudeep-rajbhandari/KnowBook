/**
 * Created by USER on 2/8/2017.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var notesSchema = new Schema({

    "Subjectid":{"type": Schema.Types.ObjectId,required:true, ref: 'subject'},
    "NoteTopic":{"type":String},
    "pdf": {"type": Schema.Types.Mixed, required: true},
    "morePdfs": Schema.Types.Mixed
});

module.exports=mongoose.model('notes',notesSchema);
