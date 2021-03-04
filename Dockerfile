FROM node

WORKDIR /mern

COPY ./package.json ./ 
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/@types ./packages/@types

RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/web/build ./packages/server/dist/public
COPY ./packages/server/.env.production ./packages/server/.env.production

EXPOSE 5000

CMD ["yarn", "serve"]