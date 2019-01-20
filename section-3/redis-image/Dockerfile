# 1. Use an existing docker image as a base
FROM alpine

# 2. Download and install a dependency
RUN apk add --update redis
RUN apk add --update gcc

# 3. Tell the image what to do when its starts as a container
CMD [ "redis-server" ]
