FROM node:16

RUN mkdir /src
WORKDIR /src

COPY package*.json ./
RUN npm install --global --force yarn
RUN yarn

COPY . /src

EXPOSE 3000

CMD npm start