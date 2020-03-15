# NodeJS base image
FROM node:alpine3.10

# set working directory and '/app/node_modules/.bin' to $PATH
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

CMD ["npm", "start"]