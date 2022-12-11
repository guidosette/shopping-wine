# Site

## schematics
- copiare pa-backoffice-schematics-1.0.0.tgz in site dal progetto pa-backoffice-schematics
- oppure download -> npm run download-schematics

- cd site\src\app\backoffice
    - ng g pa-backoffice-schematics:pa-backoffice
    - ng g pa-backoffice-schematics:pa-backoffice-base-site

- dopo:
    - add modulo in backoffice-module
    - changes in MyBaseComponent
    - changes in MyBreadcrumb

- rimuovere "pa-backoffice-schematics": "file:pa-backoffice-schematics-1.0.0.tgz", da package.json dopo averlo usato!