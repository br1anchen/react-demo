FROM node:8.12.0
ARG CI
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn install
COPY . .
RUN yarn build
RUN mv /usr/src/build /public