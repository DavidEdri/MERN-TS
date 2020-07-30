#!/bin/bash

rm -rf deployment
npm run build:init
npm run build:server
npm run build:common
npm run build:web