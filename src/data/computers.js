// On simule une "base de données" avec un simple tableau en mémoire.
// ⚠️ Les données seront perdues à chaque redémarrage du serveur (c'est normal, demandé par le sujet).

let computers = [
  { id: 1, nom: "Dell Optiplex", marque: "Dell", ram: 16, statut: "disponible" },
  { id: 2, nom: "MacBook Pro", marque: "Apple", ram: 32, statut: "maintenance" },
];

// On garde un compteur séparé pour générer des ID uniques,
// même si on supprime des éléments plus tard (best practice).
let nextId = 3;

function getAll() {
  return computers;
}

function getById(id) {
  return computers.find((c) => c.id === Number(id));
}

function add(computer) {
  const newComputer = {
    id: nextId++,
    ...computer,
  };
  computers.push(newComputer);
  return newComputer;
}

function updateStatus(id, statut) {
  const computer = getById(id);
  if (!computer) return null;
  computer.statut = statut;
  return computer;
}

// On exporte les fonctions, pas le tableau directement.
// Ça s'appelle "encapsulation" : personne ne peut modifier `computers`
// depuis l'extérieur sans passer par ces fonctions contrôlées.
module.exports = {
  getAll,
  getById,
  add,
  updateStatus,
};
