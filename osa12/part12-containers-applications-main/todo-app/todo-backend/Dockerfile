FROM node:20

LABEL author="Dr.Docker"

WORKDIR /todo-backend

#COPY ./server/package*.json ./

ENV NODE_ENV dev
ENV PORT 3000
ENV MONGO_URL="mongodb://the_username:the_password@localhost:3456/the_database"
ENV REDIS_URL="localhost:6378"

#ENV DEBUG app

COPY --chown=node:node . .
#COPY . .

RUN npm ci
#RUN npm ci --omit=dev
#RUN npm install

ENV DEBUG=playground:*
  
USER node
CMD npm run dev
#CMD DEBUG=todo-backend:* npm run dev
#CMD DEBUG=todo-backend:* npm start