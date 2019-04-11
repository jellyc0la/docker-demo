FROM node:11.13-alpine
WORKDIR /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 9090
CMD ["node", "server.js"]
