FROM node:20

WORKDIR /todo-backend

#ENV VITE_BACKEND_URL="http://localhost:3000/"
ENV PORT=3000
ENV NODE_ENV development

#COPY ./package*.json ./
COPY ./todo-backend/package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Install Nodemon globally
RUN npm install -g nodemon

COPY /todo-backend /todo-backend
#COPY . .

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]

# Start the app using Nodemon
#CMD [ "nodemon", "./app.js" ]
#CMD ["nodemon", "./bin/www"]
