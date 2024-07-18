FROM node:20

WORKDIR /bloglist-backend

ENV PORT=3000

#COPY ./package*.json ./
COPY ./bloglist-backend/package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Install Nodemon globally
RUN npm install -g nodemon

COPY /bloglist-backend /bloglist-backend
#COPY . .

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]

# Start the app using Nodemon
#CMD [ "nodemon", "./app.js" ]
#CMD ["nodemon", "./bin/www"]
