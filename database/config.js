const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("db exitoso");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la conección con la base de datos");
  }
};

module.exports = {
  dbConnection,
};
