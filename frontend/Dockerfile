# build environment
FROM node:15.5.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# COPY package.json /app/package.json
COPY package.json ./

RUN npm install --silent 

COPY .eslintrc.js ./
COPY babel.config.js ./
COPY . .

ARG BACKEND_PORT
ARG BACKEND_HOST
ARG BACKEND_PROTOCOL
ARG BACKEND_PREFIX
RUN echo "VITE_API_BASE_PROTOCOL=\"${BACKEND_PROTOCOL}\"" >> ./.env
RUN echo "VITE_API_BASE_HOST=\"${BACKEND_HOST}\"" >> ./.env
RUN echo "VITE_API_BASE_PORT=\"${BACKEND_PORT}\"" >> ./.env
RUN echo "VITE_API_BASE_PREFIX=\"${BACKEND_PREFIX}\"" >> ./.env

RUN npm run build

# production environment
FROM nginx:1.19.6-alpine
COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
