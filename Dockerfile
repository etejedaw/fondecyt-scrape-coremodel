FROM node:18.12.1-alpine as base
WORKDIR "/usr/app"
COPY package*.json ./
RUN npm install

FROM node:18.12.1-alpine as builder
WORKDIR "/usr/app"
COPY --from=base "/usr/app/node_modules" "./node_modules"
COPY src ./src
COPY tsconfig.json ./
COPY package*.json ./
RUN npm run build

FROM node:18.12.1-alpine as runner
WORKDIR "/usr/app"
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder "/usr/app/dist" "./dist"
CMD [ "node","dist/app" ]
