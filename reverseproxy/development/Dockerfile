FROM caddy:2.4.6-alpine

RUN rm /etc/caddy/Caddyfile
USER root
RUN mkdir /logs
COPY Caddyfile /etc/caddy/Caddyfile