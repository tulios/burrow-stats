FROM node:7.10-slim

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /opt/burrow-stats

ADD yarn.lock yarn.lock
ADD package.json package.json
RUN yarn install

ADD . .

ENV NODE_ENV=production
RUN yarn build
CMD yarn start
