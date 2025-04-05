/**
 * @fileoverview Configuration file for connecting to MongoDB using Mongoose.
 * @module config/db
 */

 /**
  * Mongoose module.
  * @const
  * @see {@link https://mongoosejs.com/|Mongoose}
  */
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "test") {
  /**
   * Connect to MongoDB.
   * @see {@link https://mongoosejs.com/docs/connections.html|Mongoose Connections}
   */
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("connection error", err));
}

/**
 * Export the mongoose instance.
 * @type {Mongoose}
 */
module.exports = mongoose;