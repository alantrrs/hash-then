
# hash-then

_Hash files and directories_

## Install
```
npm install --save hash-then
```

## Run

```js
  var hash = require('hash-then')
  hash('/path/to/dir').then(function(hash) {
    console.log(hash)
   })
```

## How does it work?
If it's a file it just uses sha256 to get the checksum.
If it's given a path to a directory, it will create a temporary tar
of the directory with harcoded values for ``mtime`` 
(only for parent directory), ``mode``, ``gid`` and ``uid``.
