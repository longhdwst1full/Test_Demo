FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Install deps
COPY package.json yarn.lock ./
RUN apk add --no-cache python3 make g++ && \
    yarn install --frozen-lockfile --production=false

# Copy sources and build
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
