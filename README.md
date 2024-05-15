# CopeeApp

CopeeApp est une application mobile développée avec React Native et Firebase. Elle permet aux utilisateurs de bénéficier des services et informations liés aux économies d'énergie offerts par la société COPEE.

## Fonctionnalités

### Client

* Créer un compte
* Se connecter
* Réinitialiser le mot de passe
* Consulter les actualités liées aux économies d'énergie
* Consulter les installations fournies par la société COPEE
* Consulter les services fournis par la société
* Tester l'éligibilité à déployer un équipement d'économie d'énergie
* Une fois le test d'éligibilité accepté, générer une demande d'installation d'équipement

* Chat en temps réel avec le personnel
* Soumettre un retour d'expérience

### Personnel

* Se connecter
* Gérer les demandes d'installation
* Consulter les retours d'expérience
* Discuter avec les clients

### Administrateur

* Se connecter
* Gérer les utilisateurs
* Discuter avec les clients


## Instructions pour déployer le projet sur un autre ordinateur

### Prérequis

* Node.js (version 10 ou ultérieure)
* npm
* Git
* ExpoGo (Dans votre smartphone)
* Un compte Firebase avec un projet créé

### Etapes

Clonez le dépôt GitHub
```
git clone https://github.com/salimbenammar4/Copee.git
```
Accédez au répertoire du projet 
```
cd CopeeApp
```
Installez les dépendances avec npm 
```
npm install
```
Configurez Firebase
Configurez le fichier firebase.js avec les informations de configuration.
Exemple:
```
export default {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_MEASUREMENT_ID"
};
```

Lancez l'application
```
npx expo start
```

