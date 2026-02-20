#!/bin/bash

# if [ ! -f ".env"]; then
#     cp .env.example .env
# fi

pnpm install
npx prisma generate
npx prisma migrate dev
tail -f /dev/null