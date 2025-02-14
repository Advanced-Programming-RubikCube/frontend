# take base image nginx:alpine from docker hub
# copy all files from current directory to /usr/share/nginx/html in the container
# expose port 80
# run nginx in the foreground
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
