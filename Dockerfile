FROM node:6.2.0

WORKDIR /app
ADD . /app

RUN npm install --silent && npm run build

EXPOSE 8080

ENTRYPOINT ["node","./server.js"]
