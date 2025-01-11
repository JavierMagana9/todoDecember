const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todo_list", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("conection error", err));
