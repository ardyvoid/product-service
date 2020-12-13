#!/bin/bash
set -e

source ~/.profile;

echo "PRODUCT SERVICE: ENVIRONMENT IS $NODE_ENV $DEVELOPMENT_MODE";

if [ $DEVELOPMENT_MODE != "local" ]; then
  echo "PRODUCT SERVICE: DEPLOYING PRISMA!";
  npm run --prefix /app prisma:generate;

  echo "PRODUCT SERVICE: STARTING PRODUCTION SERVER!";
  npm run --prefix /app build;
  npm run --prefix /app start:prod;
else
  if [ ! -d /var/app/node_modules ]; then
    echo "PRODUCT SERVICE: MOVING NODE MODULES!";
    mv /app/node_modules /var/app/node_modules;
    mv /app/package-lock.json /var/app/package-lock.json;
  fi

  echo "PRODUCT SERVICE: DEPLOYING PRISMA!";
  npm run --prefix /var/app prisma:generate;
  # npm run --prefix /var/app prisma:migrate:deploy;

  echo "PRODUCT SERVICE: STARTING DEVELOPMENT SERVER!";
  npm run --prefix /var/app start:dev;
fi

cd /var/app;

exec "$@"
