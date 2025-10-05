#!/bin/bash

npm install
npx puppeteer browsers install chrome

case "$1" in
  dev)
    npx prisma migrate dev
    npm run start:dev
    ;;
  prod)
    npx prisma migrate deploy
    npm run build
    npm run start:prod
    ;;
  *)
    echo "Usage: $0 {dev|prod}"
    exit 1
    ;;
esac
