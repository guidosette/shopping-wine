set PATH_ANGULAR="./"

cd %PATH_ANGULAR%
call npm install
call ng build --configuration production
echo "angular builded!"
call firebase use default
call firebase deploy --only hosting
echo "angular deployed"
