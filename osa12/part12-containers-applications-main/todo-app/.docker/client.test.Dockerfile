FROM node:20

WORKDIR /todo-frontend-1

ENV NODE_ENV development

COPY ./todo-frontend-1/package*.json ./

# Change npm ci to npm install since we are going to be in development mode
#RUN npm install --only=dev
RUN npm install

#COPY ./todo-frontend .
COPY /todo-frontend-1 /todo-frontend-1
#COPY . .

# npm test is the command to start the application tests
CMD ["npm", "test"]
