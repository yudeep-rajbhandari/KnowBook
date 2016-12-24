var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var informationSchema = new Schema({

"faculty":{"type":String},
"semester":{"type":String},
"subject":{"type":String},
 "bookid": {"type": Schema.Types.ObjectId,required:true, ref: 'books'},
});

module.exports=mongoose.model('information',informationSchema);

