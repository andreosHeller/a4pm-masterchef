FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/api/package.json packages/api/package.json

RUN npm ci --workspace packages/api --include-workspace-root=false

COPY packages/api/ packages/api/
RUN npm run -w packages/api build

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

WORKDIR /app/packages/api
COPY --from=build /app/packages/api/dist ./dist
COPY --from=build /app/packages/api/migrations ./migrations
COPY --from=build /app/packages/api/seeders ./seeders
COPY --from=build /app/packages/api/.sequelizerc ./
COPY --from=build /app/packages/api/sequelize-config.js ./
COPY packages/api/package.json ./
COPY packages/api/entrypoint.sh ./entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]
