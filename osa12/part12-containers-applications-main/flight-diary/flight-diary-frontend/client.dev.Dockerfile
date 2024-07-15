FROM node:20

WORKDIR /flight-diary-frontend

ENV API_BASE_URL = "http://localhost:8080/api";

COPY ./flight-diary-frontend/package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

#COPY ./flight-diary-frontend .
COPY ./flight-diary-frontend ./flight-diary-frontend
#COPY . .


# npm start is the command to start the application in development mode
#CMD ["vite", "--host"]
CMD ["npm", "run", "dev", "--", "--host"]
