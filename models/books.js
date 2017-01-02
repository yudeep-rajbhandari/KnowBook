

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var booksSchema = new Schema({
    
    "bookName":{"type":String},
    "booktype":{"type":String},
    "writer":{"type":String},
    "publication":{"type":String},
    "price":{"type":String},
    "availability":{"type":String},
    "rackNumber":{"type":String},
     "Subjectid":{"type": Schema.Types.ObjectId,required:true, ref: 'subject'}


});

module.exports=mongoose.model('books',booksSchema);