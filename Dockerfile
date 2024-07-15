FROM node:20

RUN mkdir -p /app
WORKDIR /app

RUN corepack enable
RUN corepack prepare --activate yarn@stable

COPY package.json yarn.lock ./
RUN yarn install --immutable
COPY . ./

CMD [ "yarn", "dev"]
