```sh
docker build -f Dockerfile.dev . -t leonardosarmentocastro/frontend
docker run -p 3000:3000 leonardosarmentocastro/frontend
```

#### Mapping volumes

pwd - present working directory
mapping volumes is like mapping ports, but volumes are for folders

```sh
docker run -it -p 3000:3000 -v /app/node_modules -v $(pwd):/app leonardosarmentocastro/frontend

## Creates a container and start it
docker run

## Attach listeners for STDIN/STOUT (interactive mode)
# Will give a nice output on your terminal and you will be able to interact with it, like using "control + c" to exit it.
-it

## Port mapping
# <our computer port> forward to <container port>
-p 3000:3000

## Bookmarked volume:
# Indicates that a given folder shouldn't be replaced by any other volume reference
# (we are going to use the "/node_modules" installed inside the container as instructed in our Dockerfile).
-v /app/node_modules

## Volume mapping:
# Just as port mapping, but for folders.
# `$(pwd)`: The current filesystem path where Dockerfile is being executed
# `/app`: The Docker working directory inside the container.
# Essentialy, we are telling Docker to use our "present working directory" as a reference for `/app` inside the container. Like a "symlink".
-v $(pwd):/app

## Image name to be run
leonardosarmentocastro/frontend
```

#### `docker-compose` to the rescue