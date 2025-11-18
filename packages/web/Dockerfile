FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/web/package.json packages/web/package.json

RUN npm ci --workspace packages/web --include-workspace-root=false

COPY packages/web/ packages/web/
RUN npm run -w packages/web build

FROM nginx:alpine
COPY packages/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
