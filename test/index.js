/* eslint-env mocha */

var assert = require('assert')

var hash = require('..')

var testFile = {
  path: './test/fixtures/my-file.txt',
  hash: '8b4781a921e9f1a1cb5aa3063ca8592cac3ee39276d8e8212b336b6e73999798'
}

var testDir = {
  path: './test/fixtures',
  hash: '5246acddb05a5a39be1476412f63f5b981b1153b465146fcb4c22436bef53a24'
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
    hash('./test/something_that_doesnt_exist').then(function (hash) {
      assert.equal(hash, null)
      done()
    }).catch(done)
  })
})

