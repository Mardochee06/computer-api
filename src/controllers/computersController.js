const computersData = require("../data/computers");
const AppError = require("../utils/AppError");

// Le controller ne s'occupe QUE de la logique métier.
// Il ne connaît rien des routes (ça, c'est le rôle de routes/)
// et ne touche jamais directement à req.headers d'auth (ça, c'est le rôle des middlewares).

function getAllComputers(req, res) {
  const computers = computersData.getAll();
  res.json({ success: true, data: computers });
}

function getComputerById(req, res, next) {
  const computer = computersData.getById(req.params.id);

  if (!computer) {
    return next(new AppError("Computer not found", 404));
  }

  res.json({ success: true, data: computer });
}

function createComputer(req, res) {
  const { nom, marque, ram, statut } = req.body;

  const newComputer = computersData.add({
    nom,
    marque,
    ram,
    statut: statut || "disponible", // valeur par défaut si non fournie
  });

  res.status(201).json({ success: true, data: newComputer });
}

function updateComputerStatus(req, res, next) {
  const updated = computersData.updateStatus(req.params.id, req.body.statut);

  if (!updated) {
    return next(new AppError("Computer not found", 404));
  }

  res.json({ success: true, data: updated });
}

module.exports = {
  getAllComputers,
  getComputerById,
  createComputer,
  updateComputerStatus,
};
