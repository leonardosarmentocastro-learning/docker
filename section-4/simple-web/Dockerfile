# 1. Specifying base image
FROM node:alpine

# 2. Run commands to prepare our image
# Set the working directory where all commands are going to be executed inside our container
# NOTE: The path is created if it doesn't exist
WORKDIR /usr/simple-web

# Copy build files from our current file system to this container file system
# COPY <current-context-file-system-path> <container-file-system-path>
COPY ./package.json ./
RUN npm install

# We split the copy of "package.json" and everything else in order to take advantage of the cache system.
# Docker detect that the content of `index.js` has changed, so it would run `npm install` everytime a line of code is changed.
# To avoid that, we tie the `package.json` and `npm install` in a sequence order that will make Docker run `npm install`
# only if the content of `package.json` is changed, not considering everything else.
COPY ./ ./

# 3. Setup a startup command
CMD [ "npm", "start" ]

# IMPORTANT:
# Since we are exposing a webserver, and the container is an isolated segmented virtual piece of software,
# we need to map our context port to the container port.
# This step must be done when running the container.
# docker run -p <context-port>:<container-port> <docker-image-name>
