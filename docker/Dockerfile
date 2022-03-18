FROM node:17.7-alpine AS builder

WORKDIR /coupdepousse-back

COPY ./ /coupdepousse-back/

RUN npm install

FROM node:17.7-alpine AS prod

WORKDIR /coupdepousse-back

COPY --from=builder /coupdepousse-back /coupdepousse-back