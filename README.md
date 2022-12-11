# shopping-wine

## procedure da root (creare prima il prgetto firebase)

IMPORTANTE (perchè non viene copiato):
- copiare da backoffice-schematics project 
  - functions/.gitignore
  - site/.gitignore
  - .gitignore
  - site/list-routes.js

### git creare prima progetto su GitHub
git init
git remote add origin [projectUrl]
(git remote set-url origin [projectUrl]) se già esiste origin
git add .
git commit -m "first commit"
git push -u origin master

## submodule 

git submodule init 

(se necessario)
git rm -r --cached functions/src/FirebaseFunctionsLib 

git submodule add git@github.com:PowerAppITA/FirebaseFunctionsLib.git functions/src/FirebaseFunctionsLib 

 
(se necessario)
git rm -r --cached site/src/app/FirebaseBackofficeLib 

git submodule add git@github.com:PowerAppITA/FirebaseBackofficeLib.git site/src/app/FirebaseBackofficeLib 

 
(se necessario)
git rm -r --cached site/src/app/PaUtils 

git submodule add git@github.com:PowerAppITA/PaUtils.git site/src/app/PaUtils 

 
(se necessario)
git rm -r --cached site/src/app/VenditoreDigitaleShared 

git submodule add git@github.com:PowerAppITA/VenditoreDigitaleShared.git site/src/app/VenditoreDigitaleShared 

## Access
sviluppo@powerapp.it
Gennaio2022!

## Firebase

- Abilitazione Authentication (anonimo e email)
- firestore abilitare
    - eur3 (europe-west)
    - update rules (firestore.rules)
- cambiare nome pubblico da impostazioni
- creare un nuovo account di fatturazione in GCP console
- abilitare functions facendo l'upgrade a Blaze selezionando l'account creato precedentemente
- cd functions -> npm run deploy
- in GCP -> IAM aggiungere il ruolo "Amministratore importazione/esportazione Cloud Datastore" a "...@appspot.gserviceaccount.com"
- aggiungere applicazione Web in console con configurazione hosting -> sostituire in environment (anche prod) la configurazione creata

- firebase use default

- in site
  - npm run init-project

- creazione superAdmin
  - cd functions/
  - npm run shell
  - callTest()

Deploy hosting
  - cd site
  - npm run deploy-site-prerender

- Cambiare logo.webp
- Cambiare loading.webp
- Cambiare favicon
- Cambiare image-placeholder
- Cambiare image-placeholder-seo

- Indici
  - cd site
  - firebase use default
  - npm run deploy-index

## Cloud build
- creare un secret in Sicurezza -> secret manager (lo si può fare anche dopo)
  - abilitare Secret Manager API
  - nome -> webhook_cloud_build
  - valore secret -> qr9c52M57mb (esempio)

- connettere repository GitHub in Cloud Build (lo si può fare anche dopo)
  - collegarsi con PowerAppITA

- dare in IAM il ruolo Amministratore Firebase Hosting a shopping-wine@appspot.gserviceaccount.com

- abilitare Identity and Access Management (IAM) API

- creare un trigger in Cloud Build
  - nome -> Deploy
  - evento -> Evento webhook
  - secret -> selezionare quello creato precedentemente
  - Località -> Repository
  - posizione file di configurazione Cloud Build -> cloudbuild.yaml
  - aggiungere variabile
    - nome -> _FIREBASE_TOKEN
    - valore -> 1//09kCehI7A_mqECgYIARAAGAkSNwF-L9IrUG1MgysGm4-uE-TTIiRV0XPnsPf4MrS4iaqKCzospy4nSB2iWdA0z5q9gC-TrTKy-GQ -> si ottiene con firebase login:ci
  - attivare email di servizio -> scegliere tipo shopping-wine@appspot.gserviceaccount.com

anteprima trigger url del tipo:
 - https://cloudbuild.googleapis.com/v1/projects/shopping-wine/triggers/Deploy:webhook?key=<chiave>&secret=<SECRET>
 - chiave -> in Api Credenziali -> Cloud Build Triggering oppure in modifica Trigger in anteprima url
 - mettere questi dati in admin.ts (in functions)

## smtp build deploy
https://cloud.google.com/build/docs/subscribe-build-notifications
https://cloud.google.com/build/docs/configuring-notifications/configure-smtp
- service-127042648912@gcp-sa-cloudbuild.iam.gserviceaccount.com con ruolo Agente di servizio Cloud Build
- gcloud pubsub topics create cloud-builds --project=shopping-wine
- gcloud iam service-accounts create cloud-run-pubsub-invoker --display-name "Cloud Run Pub/Sub Invoker" --project=shopping-wine
- Crea un sottoscrittore push Pub/Sub per il tuo strumento di notifica:
  gcloud pubsub subscriptions create subscriber-smtp --topic=cloud-builds --push-endpoint=https://europe-west1-shopping-wine.cloudfunctions.net/handleBuildResult --push-auth-service-account=cloud-run-pubsub-invoker@shopping-wine.iam.gserviceaccount.com --message-filter='attributes.status=\"CANCELLED\" OR attributes.status=\"FAILURE\" OR attributes.status=\"TIMEOUT\"' --project=shopping-wine

- aggiungere handleBuildResult nelle functions


## Analytics NO
- creare un tag in GTM con
  - attivatore 'All Pages'
  - attivatore 'Modifica cronologia'
  - (attivare 'Invia un evento di visualizzazione di pagina quando viene caricata questa configurazione')
- settare GTM in base-site component (setUpAnalytics)
- in GA
  - dettagli stream web -> Misurazione avanzata -> attivare 'Cambi di pagina in base agli eventi della cronologia del browser'