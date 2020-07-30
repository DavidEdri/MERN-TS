FROM node

WORKDIR /mern

COPY ./package.json ./ 
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN npm i -g yarn --no-bin-links
RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/web/build ./packages/server/dist/public
COPY ./packages/server/.env ./packages/server/.env

RUN cd packages/server && yarn add core-js@2.5.7 && cd ../..

EXPOSE 5000

CMD ["npm", "run", "serve"]