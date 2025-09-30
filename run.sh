#!/bin/bash

npm install

case "$1" in
  dev)
    npx prisma migrate dev
    npm run start:dev
    ;;
  prod)
    npx prisma migrate deploy
    npm run start:prod
    ;;
  *)
    echo "Usage: $0 {dev|prod}"
    exit 1
    ;;
esac
