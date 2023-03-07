FROM node:18-alpine AS dependencies

WORKDIR /scheduler-app
COPY package.json ./
RUN yarn

FROM node:18-alpine AS build

WORKDIR /scheduler-app
COPY --from=dependencies /scheduler-app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN yarn build

FROM node:18-alpine AS deploy

WORKDIR /scheduler-app

ENV NODE_ENV production

COPY --from=build /scheduler-app/public ./public
COPY --from=build /scheduler-app/package.json ./package.json
COPY --from=build /scheduler-app/.next/standalone ./
COPY --from=build /scheduler-app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]