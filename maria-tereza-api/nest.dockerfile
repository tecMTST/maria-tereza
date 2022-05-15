FROM node:lts
COPY ./maria-tereza-api/dist /var/www
WORKDIR /var/www
RUN node main 
EXPOSE 3000