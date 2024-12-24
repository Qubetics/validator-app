# FROM node:16-alpine AS builder

# WORKDIR /home/node
# COPY --chown=node:node . .

# ARG BUILD_EXPIRE
# ARG BUILD_DOMAIN
# # ARG NPM_AUTH_TOKEN

# # USER node

# # ENV NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}

# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN apk add make

# RUN npm i --force
# RUN npm run build

# FROM nginx:mainline-alpine

# COPY --from=builder /home/node/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 3001



FROM node:18.17.0-alpine

WORKDIR /src

COPY . .
# COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm","run","start"]
