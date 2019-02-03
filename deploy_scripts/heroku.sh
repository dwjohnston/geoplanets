#!/bin/sh

docker build -t video-geoplanets . 
docker tag video-geoplanets registry.heroku.com/video-geoplanets/web
docker push registry.heroku.com/video-geoplanets/web
heroku container:release web -a=video-geoplanets
