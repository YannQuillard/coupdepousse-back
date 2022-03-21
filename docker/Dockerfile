FROM node:17-alpine As development

WORKDIR /coupdepousse-back

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:17-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /coupdepousse-back

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /coupdepousse-back/dist ./dist

CMD ["node", "dist/main"]