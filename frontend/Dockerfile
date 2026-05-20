FROM node:25-alpine AS base


FROM base AS deps

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY --from=payload . /payload/

ARG NODE_ENV
RUN NODE_ENV=${NODE_ENV} npm ci
RUN NODE_ENV=${NODE_ENV} npm i ../payload --install-links


FROM base AS files

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


FROM files AS builder

CMD npm run build
