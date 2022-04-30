FROM node:14.19.1 AS base
WORKDIR /app

COPY package*.json /
RUN npm install --frozen-lock-file --quiet

FROM base as production
COPY . .
RUN npm run build
RUN npm install --only=prod --frozen-lock-file --quiet
CMD [ "npm", "start" ]
