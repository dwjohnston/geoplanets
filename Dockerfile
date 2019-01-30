FROM node:9.11 as builder
RUN node -v 
RUN python -V
RUN apt update
RUN apt install python2.7 -y
RUN python -V
RUN npm install -g node-gyp
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app
RUN npm run build

FROM node:9.11-alpine
RUN node -v 
COPY --from=builder /usr/src/app /usr/app
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
ENV PORT 80
CMD ["node", "/usr/app/public/index.js"]
#CMD ["ls", "/usr/public"]