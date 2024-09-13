import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});
