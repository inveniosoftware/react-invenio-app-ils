# react-invenio-app-ils

Single Page App built with React for [InvenioILS](https://inveniosoftware.org/products/ils/)

The official documentation is available at https://invenioils.docs.cern.ch.

## Update dependencies

To update dependencies you need to run `npm install` in the target deployment
environment:

```shell
$ rm -rf package-lock.json && rm -rf node_modules

# Run the container with x86_64 architecture
$ docker run -it --platform="linux/amd64" --rm -v $(pwd):/app -w /app node:14-alpine sh

[root@3954486e4a37]# npm install
```
