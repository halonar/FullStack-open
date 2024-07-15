FROM node:20

WORKDIR /flight-diary-backend

#ENV VITE_BACKEND_URL="http://localhost:3000/"
ENV PORT=3000

#COPY ./package*.json ./
COPY ./flight-diary-backend/package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Install Nodemon globally
RUN npm install -g nodemon

COPY /flight-diary-backend /flight-diary-backend
#COPY . .

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]

# Start the app using Nodemon
#CMD [ "nodemon", "./app.js" ]
#CMD ["nodemon", "./bin/www"]
