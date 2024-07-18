FROM node:20

WORKDIR /bloglist-frontend

COPY ./bloglist-frontend/package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

#COPY ./todo-frontend .
COPY /bloglist-frontend /bloglist-frontend
#COPY . .

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
