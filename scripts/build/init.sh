#!/bin/bash

rm -rf deployment

mkdir deployment
mkdir deployment/packages

cp ./package.json deployment/
cp ./yarn.lock deployment/