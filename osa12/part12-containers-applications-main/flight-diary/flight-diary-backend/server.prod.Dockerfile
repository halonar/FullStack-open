FROM node:20-alpine

WORKDIR /express-app

COPY ./flight-diary-backend/package*.json ./
COPY ./flight-diary-backend/tsconfig.json ./

RUN npm ci
#RUN npm install --production

COPY /flight-diary-backend/ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
