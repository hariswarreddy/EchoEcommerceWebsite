import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(
        `MongoDb is connected with the server: ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectDatabase;
