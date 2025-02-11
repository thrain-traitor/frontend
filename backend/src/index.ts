import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/userRoute";

// config dotenv untuk mengambil data dari .env
dotenv.config();

// Inisialisasi express sebagai app
const app = express();
const PORT = process.env.PORT || 3000; // Akan mengambil dari env

// Inisialisai cors dan body parser
app.use(cors());
app.use(bodyParser.json());

// Inisialisasi Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
