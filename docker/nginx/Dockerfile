FROM debian:jessie

# Use the archived repositories and remove jessie-updates
RUN sed -i 's/http:\/\/deb.debian.org\/debian/http:\/\/archive.debian.org\/debian/g' /etc/apt/sources.list && \
    sed -i 's/http:\/\/security.debian.org\/debian-security/http:\/\/archive.debian.org\/debian-security/g' /etc/apt/sources.list && \
    sed -i '/jessie-updates/d' /etc/apt/sources.list

# Install gnupg to handle the archive key, and install nginx, while ignoring expired keys and using force-yes
RUN apt-get update && \
    apt-get install -y --force-yes --no-install-recommends gnupg && \
    apt-get -o Acquire::Check-Valid-Until=false update && \
    apt-get install -y --force-yes --no-install-recommends nginx

ADD nginx.conf /etc/nginx/
ADD app.conf /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/app
RUN rm /etc/nginx/sites-enabled/default

RUN echo "upstream php-upstream { server php:9000; }" > /etc/nginx/conf.d/upstream.conf

RUN usermod -u 1000 www-data

WORKDIR /var/www/app/

CMD ["nginx"]

EXPOSE 80
EXPOSE 443
