## To Run on laptop/desktop for development
1. install node
2. npm install -g @angular/cli
3. cd into the project
4. npm install
5. ng serve --open 
this should open the application in a browser

## To Test build before pushing to repo
1. npm build

## To deploy to prod server
1. npm build --prod
2. copy dist contents to a webserver

 
## TO Build with minification

 1. ng build --optimization --source-map=false --named-chunks=false --extract-licenses=true --vendor-chunk=false --output-hashing all --aot --build-optimizer=true
      