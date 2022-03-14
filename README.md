# Installation dépandences
---
## Client
---
Chemin:

`/client`

Commande:

`npm install`

## Serveur
---
Chemin

`/server`

Commande:

`npm install`

### Base de données
#### Configuration

Chemin

`/server/src/config/config.json`

Changer l'objet **development** pour la connexion à votre base de données mysql.

`{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
`

#### Sequelize
Chemin:

`/server`

Installation de sequelize-cli:

`npm install sequelize-cli`

Création de la base de données:

`sequelize db:create `

Création des tables:

`sequelize db:migrate`

Création des rôles:

`sequelize db:seed:all`


# Démarrage
---
## Client
---
Chemin:

`/client`

Commande:

`npm run dev`

## Serveur
---
Chemin:

`/server`

Commande:

`npm start`