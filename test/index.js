/* eslint-env mocha */

var assert = require('assert')

var hash = require('..')
var fs = require('fs')
var path = require('path')
var os = require('os')

var testFile = {
  path: path.join('test', 'fixtures', 'my-file.txt'),
  hash: '8b4781a921e9f1a1cb5aa3063ca8592cac3ee39276d8e8212b336b6e73999798'
}

var testDir = {
  path: path.join('test', 'fixtures'),
  hash: '7b5cba5f5c786dc2f070f3456ac1d34fcdccecb59d328d44e6ece543f302f16c'
}

describe('hash(path).then(..)', function () {
  it('should hash files', function (done) {
    hash(testFile.path).then(function (hash) {
      assert.equal(hash, testFile.hash)
      done()
    }).catch(done)
  })
  it('should hash directories', function (done) {
    hash(testDir.path).then(function (hash) {
      assert.equal(hash, testDir.hash)
      done()
    }).catch(done)
  })
  it('non-existent paths should return null', function (done) {
    hash(path.join('test', 'something_that_doesnt_exist')).then(function (hash) {
      assert.equal(hash, null)
      done()
    }).catch(done)
  })
})
describe('hash(path, output).then(..)', function () {
  it('it should save the tar to ${output}hash.tar', function (done) {
    const outputDir = os.tmpdir()
    hash(testDir.path, outputDir).then(function (hash) {
      assert.equal(hash, testDir.hash)
      assert(fs.lstatSync(path.join(outputDir, hash + '.tar')).isFile())
      done()
    }).catch(done)
  })
})
