FROM node:20-alpine

WORKDIR /express-app

COPY ./todo-backend/package*.json ./

RUN npm ci
#RUN npm install --production

COPY /todo-backend ./

EXPOSE 3000

CMD ["npm", "start"]
