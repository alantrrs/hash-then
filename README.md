
# hash-then

_Hash files and directories_

## How does it work?
- Given a non-existent path it will return ``null``
- Given a file path it will return sha256 of the file
- Given a path to a directory, it will create a temporary tar
of the directory with harcoded values for ``mtime``, ``mode``, ``gid`` and ``uid`` and return
the sha256 for that tar.

## Install
```
npm install --save hash-then
```

## Use
### As a library
```js
  var hash = require('hash-then')
  hash('/path/to/dir').then(function(hash) {
    console.log(hash)
  })
```

### From CLI
```bash
$ node cli.js test/fixtures/my-file.txt 
> test/fixtures/my-file.txt   8b4781a921e9f1a1cb5aa3063ca8592cac3ee39276d8e8212b336b6e73999798
```

