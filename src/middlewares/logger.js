// Un middleware Express a toujours la signature (req, res, next).
// Il s'exécute "dans le tuyau" avant que la requête n'atteigne le controller.
// `next()` est OBLIGATOIRE sinon la requête reste bloquée pour toujours.
function logger(req, res, next) {
  const now = new Date();

  // On formate la date en "YYYY-MM-DD HH:mm" comme demandé dans le sujet
  const pad = (n) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  console.log(`${req.method} ${req.originalUrl} - ${date} ${time}`);

  next(); // on passe la main au middleware/route suivant
}

module.exports = logger;
