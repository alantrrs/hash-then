#!/usr/bin/env node

var hash = require('.')

if (process.argv.length === 3)  {
  hash(process.argv[2]).then(function (hash) {
    console.log(`${process.argv[2]}\t${hash}`)
  })
} else {
  console.log('Use: hash-then /path/to/file/or/directory')
}
