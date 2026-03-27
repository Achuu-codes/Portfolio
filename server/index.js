import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import contactRoutes from "./routes/contactRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../client/dist");

await connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDistPath));

  app.get("/{*splat}", (_request, response) => {
    response.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
