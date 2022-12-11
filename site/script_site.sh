#! /bin/bash
PATH_ANGULAR="./"

cd $PATH_ANGULAR
npm install
ng build --configuration production
echo "angular builded!"
#firebase target:apply hosting backoffice app-venditore-digitale-back
#firebase deploy
firebase use default
firebase deploy --only hosting
echo "angular deployed"
