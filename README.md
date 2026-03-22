# My Favorite Places app

This is a demo app to work arround Docker and CI, you should clone this repo, remove the `.git` folder and push it to your own public repo !

The client folder is empty, you may create an interface to communicate with the server! This is kind of a bonus.

# Installation

First, clone the repo and cd into it:
```bash
git clone https://github.com/Buldozer42/my-favorite-places.git
cd my-favorite-places
```

Then, build and run the Docker containers:
```bash
docker compose up --build
```

App will be available at http://localhost:5173

## Running tests

### API tests

To run the tests, make sure the server is running and execute the following command in the `server` directory:
```bash
npm test
```

### E2E tests
To run the end-to-end tests, make sure the server is running and execute the following command in the `client` directory:
```bash
npm run e2e
```

## API Routes

**Base URL:** `http://127.0.0.1:3000/api`

All routes are prefixed with `/api`.

### Users Routes

#### POST `/api/users`
Create a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "item": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Errors:**
- `400`: email and password are required
- `500`: unable to create user

#### POST `/api/users/tokens`
Sign in and get an authentication token.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400`: invalid credentials

#### GET `/api/users/me`
Get the authenticated user's information.

**Headers:** `Authorization: Bearer <token>` or Cookie `token`

**Response (200):**
```json
{
  "item": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Errors:**
- `401`: unauthorized

---

### Addresses Routes

#### POST `/api/addresses`
Create a new favorite address.

**Headers:** `Authorization: Bearer <token>` or Cookie `token`

**Body:**
```json
{
  "name": "My favorite restaurant",
  "description": "An incredible place",
  "searchWord": "Tour Eiffel, Paris"
}
```

**Response (200):**
```json
{
  "item": {
    "id": 1,
    "name": "My favorite restaurant",
    "description": "An incredible place",
    "lat": 48.8584,
    "lng": 2.2945
  }
}
```

**Errors:**
- `400`: name and searchWord are required
- `401`: unauthorized
- `404`: address not found

#### GET `/api/addresses`
Get all favorite addresses for the authenticated user.

**Headers:** `Authorization: Bearer <token>` or Cookie `token`

**Response (200):**
```json
{
  "items": [
    {
      "id": 1,
      "name": "My favorite restaurant",
      "description": "An incredible place",
      "lat": 48.8584,
      "lng": 2.2945
    }
  ]
}
```

**Errors:**
- `401`: unauthorized

#### POST `/api/addresses/searches`
Search addresses within a given radius from a position.

**Headers:** `Authorization: Bearer <token>` or Cookie `token`

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

**Response (200):**
```json
{
  "items": [
    {
      "id": 1,
      "name": "My favorite restaurant",
      "description": "An incredible place",
      "lat": 48.8584,
      "lng": 2.2945
    }
  ]
}
```

**Errors:**
- `400`: radius is required (positive number) or invalid from value
- `401`: unauthorized
