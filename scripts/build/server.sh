#!/bin/bash

npm run build --prefix packages/server
mkdir deployment/tmp
[ -d "deployment/packages/server/dist/public" ] && mv deployment/packages/server/dist/public/* deployment/tmp
rm -rf deployment/packages/server

rsync -av --progress packages/server/ deployment/packages/server/ --exclude src --exclude node_modules --exclude log
mkdir deployment/packages/server/dist/public
[ -d "deployment/tmp" ] && mv deployment/tmp/* deployment/packages/server/dist/public
rm -rf deployment/tmp/