var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

ToDoSchema.plugin(mongoosePaginate);
var ToDo = mongoose.model('Todo', ToDoSchema);

var taskList = [
    {"description":"Weekly call at 8 AM"},
    {"description":"Team meeting at 10 AM"},
    {"description":"Follow up meeting with the clients"},
    {"description":"Weekly Sales call at 6:30 PM"}];
ToDo.insertMany(taskList);

module.exports = ToDo;