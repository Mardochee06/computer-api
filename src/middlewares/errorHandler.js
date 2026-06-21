// Un middleware d'erreur Express se reconnaît par ses 4 paramètres : (err, req, res, next).
// Express le détecte automatiquement à cette signature et l'appelle
// dès qu'on fait next(error) n'importe où dans l'app.
// Il DOIT être déclaré en DERNIER dans app.js.
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur interne du serveur";

  // Pratique pour déboguer en développement
  console.error(`[ERROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
}

// Middleware pour les routes qui n'existent pas du tout (404 générique)
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}

module.exports = { errorHandler, notFoundHandler };
