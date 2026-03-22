# My Favorite Places app

This is a demo app to work arround Docker and CI, you should clone this repo, remove the `.git` folder and push it to your own public repo!

The client folder is empty, you may create an interface to communicate with the server! This is kind of a bonus

# Installation

```bash
docker compose up -d
```
Front : http://localhost:5173
API : http://localhost:3000/api

## API Routes

**Base URL:** `http://127.0.0.1:3000/api`

Toutes les routes sont préfixées par `/api`.

### Users Routes

#### POST `/api/users`
Créer un nouvel utilisateur.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse (200):**
```json
{
  "item": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Erreurs:**
- `400`: email et password requis
- `500`: impossible de créer l'utilisateur

#### POST `/api/users/tokens`
Se connecter et obtenir un token d'authentification.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erreurs:**
- `400`: mauvaises credentials

#### GET `/api/users/me`
Obtenir les informations de l'utilisateur connecté.

**Headers:** `Authorization: Bearer <token>` ou Cookie `token`

**Réponse (200):**
```json
{
  "item": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Erreurs:**
- `401`: non autorisé

---

### Addresses Routes

#### POST `/api/addresses`
Créer une nouvelle adresse favorite.

**Headers:** `Authorization: Bearer <token>` ou Cookie `token`

**Body:**
```json
{
  "name": "Mon restaurant préféré",
  "description": "Un endroit incroyable",
  "searchWord": "Tour Eiffel, Paris"
}
```

**Réponse (200):**
```json
{
  "item": {
    "id": 1,
    "name": "Mon restaurant préféré",
    "description": "Un endroit incroyable",
    "lat": 48.8584,
    "lng": 2.2945
  }
}
```

**Erreurs:**
- `400`: name et searchWord requis
- `401`: non autorisé
- `404`: adresse non trouvée

#### GET `/api/addresses`
Obtenir toutes les adresses favorites de l'utilisateur connecté.

**Headers:** `Authorization: Bearer <token>` ou Cookie `token`

**Réponse (200):**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Mon restaurant préféré",
      "description": "Un endroit incroyable",
      "lat": 48.8584,
      "lng": 2.2945
    }
  ]
}
```

**Erreurs:**
- `401`: non autorisé

#### POST `/api/addresses/searches`
Rechercher des adresses dans un rayon donné à partir d'une position.

**Headers:** `Authorization: Bearer <token>` ou Cookie `token`

**Body:**
```json
{
  "radius": 5000,
  "from": {
    "lat": 48.8566,
    "lng": 2.3522
  }
}
```

**Réponse (200):**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Mon restaurant préféré",
      "description": "Un endroit incroyable",
      "lat": 48.8584,
      "lng": 2.2945
    }
  ]
}
```

**Erreurs:**
- `400`: radius requis (nombre positif) ou from invalide
- `401`: non autorisé
