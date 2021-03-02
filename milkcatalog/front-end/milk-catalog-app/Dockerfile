FROM node:14.16-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG env=prod
RUN npm run build

FROM nginx:1.18.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/milk-catalog-app /usr/share/nginx/html