FROM node:14.19.1 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM dependencies as production
WORKDIR /app
COPY src ./src
COPY tsconfig.json ./tsconfig.json
RUN npm run build
CMD [ "node", "build", "index.js" ]
