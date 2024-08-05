Ce projet est composé d'un backend et d'un frontend.

## Backend

**Installation:**

1. Accédez au répertoire backend: `cd backend`
2. Renommez le fichier `.env.exemple` en `.env`
3. Installez les dépendances: `npm install` ou `yarn install`
4. Créez une base de données avec le même nom que celui spécifié dans le fichier `.env` (variable `DB_DATABASE`)
5. Lancez le serveur: `npm run dev`
   - Le serveur sera accessible à l'adresse `http://localhost:3000`

**Créer un utilisateur admin:**

1. Ouvrez le fichier `backend -> routes/route.user.ts`
2. Supprimez les fonctions `authenticate` et `authorizeOwner` sur la route `/user/create`
3. Enregistrez les modifications

**Utilisation de Postman:**

1. Ouvrez Postman
2. Utilisez la méthode POST à l'adresse `http://localhost:3000/api/user/create`
3. Ajoutez le JSON suivant dans le corps de la requête:

```json
{
  "firstName": "admin",
  "lastName": "admin",
  "email": "admin@example.com",
  "password": "admin12345",
  "role": "admin"
}
```

3. Exécutez la requête

## Frotend

**Installation:**

1. Accédez au répertoire frontend: `cd frontend`
2. Installez les dépendances: `npm install` ou `yarn install`
3. Lancez le serveur: `npm run dev`
   - Le serveur sera accessible à l'adresse `http://localhost:5173`
