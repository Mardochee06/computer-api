require("dotenv").config(); // charge le fichier .env DOIT être en tout premier

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const logger = require("./middlewares/logger");
const apiKeyAuth = require("./middlewares/apiKeyAuth");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const computersRoutes = require("./routes/computersRoutes");

const app = express();

// --- Sécurité ---
// Helmet ajoute automatiquement une vingtaine d'en-têtes HTTP de sécurité
// (anti-clickjacking, anti-sniffing MIME, etc.)
app.use(helmet());

// CORS : on n'autorise QUE le front-end attendu (ex: une app React/Vite en local)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// --- Parsing du body JSON ---
// Sans ça, req.body serait undefined sur les POST/PATCH
app.use(express.json());

// --- Logger (on veut voir TOUTES les requêtes, donc avant l'auth) ---
app.use(logger);

// --- Authentification par clé API (protège toutes les routes /computers) ---
app.use("/computers", apiKeyAuth);

// --- Routes ---
app.use("/computers", computersRoutes);

// --- Route santé simple (pratique pour vérifier que le serveur tourne) ---
app.get("/", (req, res) => {
  res.json({ success: true, message: "API Computers opérationnelle" });
});

// --- Gestion des erreurs (toujours en dernier !) ---
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
