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

RUN npm run build


FROM base AS runner

WORKDIR /app

USER node
COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown node .next

COPY --from=builder --chown=node /app/.next/standalone ./
COPY --from=builder --chown=node /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js
