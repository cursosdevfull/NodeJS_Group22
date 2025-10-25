ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS dependencies
ARG DIRECTORY=apps/backoffice
COPY ${DIRECTORY}/package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --omit=dev

FROM base AS build
ARG DIRECTORY=apps/backoffice
COPY ${DIRECTORY}/package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY ${DIRECTORY}/. .
RUN npm run build

FROM base AS final
ARG DIRECTORY=apps/backoffice
COPY ${DIRECTORY}/package.json .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./.env

USER node

CMD ["npm", "run", "start"]
