#!/bin/bash
./docker/build_production_image.sh
docker tag node-template:latest registry.heroku.com/node-template-$TRAVIS_BRANCH/web
echo "$HEROKU_TOKEN" | docker login --username=_ --password-stdin registry.heroku.com
docker push registry.heroku.com/node-template-$TRAVIS_BRANCH/web
