// Une classe d'erreur "métier" qui porte un code HTTP avec elle.
// Ça évite de retaper { success: false, message: "..." } partout
// et ça permet à n'importe quel controller de dire "next(new AppError(...))"
// et de laisser le middleware central gérer la réponse.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
