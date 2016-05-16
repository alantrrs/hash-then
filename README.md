
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
- Given a non-existent path it will return ``null``
- Given a file path it will return sha256 of the file
- Given a path to a directory, it will create a temporary tar
of the directory with harcoded values for ``mtime`` 
(only for parent directory), ``mode``, ``gid`` and ``uid`` and return
the sha256 for that tar.
