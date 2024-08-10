

# Projet : Interface Utilisateur pour Application Web Python


## Résumé du projet

Ce projet vise à développer une interface utilisateur interactive et responsive pour une application web Python qui s'exécute localement, en utilisant les technologies web standard (html, css, javascript).
Cette application est implémentée sous la forme d'une API REST. Elle fournit des informations sur le classement de films à partir d'urls interrogeables à l'aide d'un client HTTP graphique (un navigateur web ou postman), ou d'un client HTTP programmatique (requests en python ou fetch en javascript). 


## Installation et exécution de l'application

Pour installer et exécuter cette application, suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale :
   ```
   git clone https://github.com/Boras72/DA-Python-Code-P6-OC.git
   ```

2. Naviguez vers le répertoire du projet :
   ```
   cd DA-Python-Code-P6-OC
   ```

3. Assurez-vous d'avoir Python installé sur votre système. Si ce n'est pas le cas, téléchargez-le depuis [python.org](https://www.python.org/downloads/).


4. Activez l'environnement virtuel :
   ```
   env\Scripts\activate
   ```

5. Lancez le serveur (la commande exacte peut varier en fonction de la structure de votre projet) :
   ```
   python manage.py runserver
   ```

6. Utiliser l'extension "Live Serve" de visual studio pour ouvrir votre navigateur et accédez à l'URL indiquée dans la console : `http://localhost:5XXX` afin d'afficher les résultats des requêtes de l'application web.


## Fonctionnalité

- Développement d'une interface utilisateur pour une application web Python interactive et responsive
  afin de récupérer et afficher des informations d'une base de données cinématographiques.



## Structure du code

```
DA-Python-Code-P6-OC/
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── html/
│   └── index.html
├── api_rest.http  (client http)
├── README.md
```

## Client http graphique

- api_rest.http


## Technologies utilisées

- HTML5
- CSS3
- JavaScript


## Contribution

Les contributions à ce projet sont les bienvenues. Pour contribuer :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b ./feature`)
3. Committez vos changements (`git commit -m 'feature'`)
4. Poussez vers la branche (`git push origin ./feature`)
5. Ouvrez une Pull Request


## Licence

Ce projet est sous licence Opensource. Les droits d'utilisation ne sont pas explicitement définis.


## Contact

@mail : borasomiko@gmail.com

Lien du projet : [https://github.com/Boras72/DA-Python-Code-P6-OC]

Pour toute question ou suggestion, n'hésitez pas à ouvrir un problème ("Issue") dans le dépôt GitHub du projet.



