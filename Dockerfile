FROM node:20.16-alpine3.19 AS base
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --production=false && npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:1.25.4-alpine3.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/dist /var/www/html/

EXPOSE 5173

ENTRYPOINT ["nginx","-g","daemon off;"]