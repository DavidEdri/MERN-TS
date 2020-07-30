#!/bin/bash

rm -rf deployment/packages/server/dist/public
mkdir deployment/packages/server/dist/public
cd packages/web
rm -rf build
GENERATE_SOURCEMAP=false yarn build
cd ../../
mv  packages/web/build/* deployment/packages/server/dist/public
rm -rf packages/web/build