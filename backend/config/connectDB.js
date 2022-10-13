const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // "mongodb+srv://atif:atif@cluster0.mp1gyrc.mongodb.net/chat-app?retryWrites=true&w=majority",
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true  //error
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
