

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
    "Faculties":{"type":String},
     "Semester":{"type":String},
     "Subject":{"type":String}


});

module.exports=mongoose.model('books',booksSchema);