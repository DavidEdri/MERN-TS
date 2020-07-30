#!/bin/bash

npm run build --prefix packages/common
rm -rf ./deployment/packages/common

rsync -av --progress packages/common/ deployment/packages/common/ --exclude src --exclude node_modules
