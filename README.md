### Commands

- [docker create](#docker-create)
- [docker start](#docker-start)
- [docker run](#docker-run)
- [docker system prune](#docker-system-prune)
- [docker logs](#docker-logs)
- [docker stop](#docker-stop)
- [docker kill](#docker-kill)
- [docker exec](#docker-exec)

#### `docker create`

Creates a containers, which means, takes a "file system snapshot" of a desired Docker image and allocates it to a namescape inside our hard-drive.

```sh
docker create hello-world # "hello-world" is the Docker image name
c041449b290027271787eb3a97f817c2a5af6c2d3efa91c4764775f3e8fec916 # The ID of the container is printed.
```

It is important to notice that "startup command" can only be overriden during this step and can't be done in the future when running the same container.

#### `docker start`

Runs the "startup command" of a given container previously generated by a Docker image.

```sh
docker start c041449b290027271787eb3a97f817c2a5af6c2d3efa91c4764775f3e8fec916 # This serial number refers to the previously created container ID.
c041449b290027271787eb3a97f817c2a5af6c2d3efa91c4764775f3e8fec916 # The container ID is printe as well.
```

The container ID is printed instead of the long text message we were used to see. Why?

The `docker start` command, by default, doesn't stick to the container initialization, which means that all signals of "STDOUT/STDERR" from the container are not being listed, therefore, will never be displayed.

To actually see the output we were used to, we need to provide the `--attach, -a` flag.

```sh
docker start -a c041449b290027271787eb3a97f817c2a5af6c2d3efa91c4764775f3e8fec916
Hello from Docker! # The message is correctly printed.
This message shows that your installation appears to be working correctly.
...
```

#### `docker run`

Stands for the combination between `docker create` + `docker start`.

```sh
docker run <image-name>
docker run <image-name> <command> # The "command" argument overrides the "run command" specified by the given docker image

# e.g.
docker run ubuntu -it bash
docker run ubuntu echo hello, I\'m overriding the startup command for this container
```

#### `docker system prune`

Removes all stopped containers, images and build cache (images downloaded from Docker Hub).

```sh
docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS                           PORTS               NAMES
dfcc9895a74c        hello-world         "echo potato"            33 seconds ago       Created                                              goofy_knuth
fa5fa6c774a9        hello-world         "/hello"                 About a minute ago   Exited (0) 52 seconds ago                            nifty_poitras
c041449b2900        hello-world         "/hello"                 27 minutes ago       Exited (0) 21 minutes ago                            pensive_montalcini

docker system prune
WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all dangling build cache
Are you sure you want to continue? [y/N] y
Deleted Containers:
dfcc9895a74c4635425a9ead3669402a6e2a5f36806eba984b10279a02d6adf9
fa5fa6c774a92637b641137170b0a80dbeda621574884e28c6c95669ab36f3ec
Total reclaimed space: 35B

docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

#### `docker logs`

Can be used to retrieve results from all "STDOUT/STDERR" emited so far by the container.

```sh
docker create busybox echo initializing the container
d9b9cc803a92476d1dbcb8fe2ead52eb541730dce9c6293cef87b015747b91c5

docker start d9b9cc803a92476d1dbcb8fe2ead52eb541730dce9c6293cef87b015747b91c5
d9b9cc803a92476d1dbcb8fe2ead52eb541730dce9c6293cef87b015747b91c5

docker logs d9b9cc803a92476d1dbcb8fe2ead52eb541730dce9c6293cef87b015747b91c5
initializing the container
```

Note: this command does not start the container, it only reads its "STDOUT/STDERR" stream output.

#### `docker stop`

Emits a `SIGTERM` (terminate signal) to the container and give it 10 seconds until it can gracefully shutdown.

If it doesn't respond/end the process in 10 seconds, it will fallback to `docker kill` command, killing it right away.

```sh
docker create busybox ping google.com
041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685

docker start 041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685
041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685

docker logs 041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685
PING google.com (172.217.22.110): 56 data bytes
64 bytes from 172.217.22.110: seq=0 ttl=37 time=12.521 ms
64 bytes from 172.217.22.110: seq=1 ttl=37 time=14.064 ms
64 bytes from 172.217.22.110: seq=2 ttl=37 time=14.099 ms
64 bytes from 172.217.22.110: seq=3 ttl=37 time=12.590 ms

docker stop 041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685 # Will hang the execution for 10 seconds...
041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685
```

#### `docker kill`

Emits a `SIGKILL` (kill signal) to the container, killing it right way, giving it no time for a graceful shutdown.

```sh
docker create busybox ping google.com
041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685

docker start 041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685
041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685

docker logs 041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685
PING google.com (172.217.22.110): 56 data bytes
64 bytes from 172.217.22.110: seq=0 ttl=37 time=12.521 ms
64 bytes from 172.217.22.110: seq=1 ttl=37 time=14.064 ms
64 bytes from 172.217.22.110: seq=2 ttl=37 time=14.099 ms
64 bytes from 172.217.22.110: seq=3 ttl=37 time=12.590 ms

docker kill 041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685 # Will kill it right away
041ad1d2bff9510ad157583b9657125d97ac2ae73f083f762dae164416031685
```

#### `docker exec`

Executes a given command inside the container and then exit it.

If you want to _interact_ with the container's bash, you must use the `-it` flag.

```sh
docker run redis

docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
dfb7e776b3c5        redis               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        6379/tcp            loving_hamilton

docker exec -it dfb7e776b3c5 redis-cli
127.0.0.1:6379> # Execute your redis command here.
```

Not providing the `-it` would execute the command and kick you off from the container's bash instantaneously.

```sh
docker run redis

docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
dfb7e776b3c5        redis               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        6379/tcp            loving_hamilton

docker exec -it dfb7e776b3c5 redis-cli
$ # Your terminal is waiting for new commands.
```