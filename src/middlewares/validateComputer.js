const AppError = require("../utils/AppError");

// Validation pour POST /computers
function validateComputer(req, res, next) {
  const { nom, marque, ram } = req.body;

  if (!nom || typeof nom !== "string") {
    return next(new AppError("Le champ 'nom' est obligatoire.", 400));
  }

  if (!marque || typeof marque !== "string") {
    return next(new AppError("Le champ 'marque' est obligatoire.", 400));
  }

  if (ram === undefined || typeof ram !== "number") {
    return next(new AppError("Le champ 'ram' doit être un nombre.", 400));
  }

  next();
}

// Validation pour PATCH /computers/:id/status
const STATUTS_AUTORISES = ["disponible", "maintenance", "hors_service"];

function validateStatus(req, res, next) {
  const { statut } = req.body;

  if (!statut || !STATUTS_AUTORISES.includes(statut)) {
    return next(
      new AppError(
        `Le statut doit être l'un des suivants : ${STATUTS_AUTORISES.join(", ")}`,
        400
      )
    );
  }

  next();
}

module.exports = { validateComputer, validateStatus };
