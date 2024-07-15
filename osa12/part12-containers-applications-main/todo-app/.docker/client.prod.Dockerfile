FROM node:20-alpine as build

WORKDIR /app

COPY ./todo-frontend-1/package*.json ./

RUN npm ci

COPY /todo-frontend-1 ./
RUN npm run build

FROM nginx:1.20.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
