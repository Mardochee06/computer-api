# API Computers — Gestion de parc informatique

API REST construite avec Node.js et Express.js permettant de gérer une liste
d'ordinateurs (stockage en mémoire, sans base de données).

## Stack technique

- Node.js / Express.js
- Helmet (sécurité des en-têtes HTTP)
- CORS (restreint à `http://localhost:5173`)
- dotenv (variables d'environnement)

## Architecture

```
src/
 ├── routes/          → définition des URLs
 ├── controllers/     → logique métier
 ├── middlewares/      → logger, auth, validation, erreurs
 ├── data/            → stockage en mémoire
 ├── utils/           → classe AppError
 └── app.js           → configuration de l'app Express
server.js             → point d'entrée (démarre le serveur)
```

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env` et ajuster si besoin :

```bash
cp .env.example .env
```

Variables :
- `PORT` : port d'écoute du serveur (défaut 3000)
- `API_KEY` : clé attendue dans le header `x-api-key` sur toutes les routes `/computers`

## Lancer le serveur

```bash
node server.js
```

Le serveur démarre sur `http://localhost:3000`.

## Authentification

Toutes les routes `/computers` exigent le header :

```
x-api-key: <valeur définie dans .env>
```

Sans ce header (ou avec une mauvaise valeur), l'API répond `401 Unauthorized`.

## Endpoints

| Méthode | URL | Description |
|---|---|---|
| GET | `/computers` | Liste tous les ordinateurs |
| GET | `/computers/:id` | Récupère un ordinateur par ID |
| POST | `/computers` | Ajoute un ordinateur |
| PATCH | `/computers/:id/status` | Modifie uniquement le statut |

### Exemple POST `/computers`

```json
{
  "nom": "HP EliteBook",
  "marque": "HP",
  "ram": 8,
  "statut": "disponible"
}
```

### Exemple PATCH `/computers/:id/status`

```json
{
  "statut": "maintenance"
}
```

Statuts autorisés : `disponible`, `maintenance`, `hors_service`.

## Format des erreurs

Toutes les erreurs renvoient :

```json
{
  "success": false,
  "message": "..."
}
```

## Tester avec curl

```bash
curl -H "x-api-key: change-me-12345" http://localhost:3000/computers
```
