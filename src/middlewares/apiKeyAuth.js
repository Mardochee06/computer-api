function apiKeyAuth(req, res, next) {
  const providedKey = req.headers["x-api-key"];

  if (!providedKey || providedKey !== process.env.API_KEY) {
    // On renvoie directement la réponse ici (pas besoin de next(error))
    // car le format est imposé tel quel par le sujet.
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
}

module.exports = apiKeyAuth;
