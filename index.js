
var fs = require('fs')
var checksum = require('checksum')
var tar = require('tar-fs')
var shortid = require('shortid')

function tarCompress (dirPath) {
  return new Promise(function (resolve, reject) {
    var tmpFile = './.' + shortid.generate()
    var out = fs.createWriteStream(tmpFile)
    tar.pack(dirPath, {
      map: function (header) {
        if (process.env.DEBUG) console.log('HEADER before:', header)
        if (header.name === '.') header.mtime = new Date(1240815600000)
        if (header.type === 'directory') header.mode = 16893
        if (header.type === 'file') header.mode = 33204
        header.gid = 1000
        header.uid = 1000
        if (process.env.DEBUG) console.log('HEADER after:', header)
        return header
      }
    }).pipe(out).on('finish', function () {
      resolve(tmpFile)
    }).on('error', function (err) {
      reject(err)
    })
  })
}

function hashDir (dir) {
  // Tar directory and hash tar file
  return tarCompress(dir).then(function (tarPath) {
    return hashFile(tarPath)
    // Cleanup and return the hash
    .then(function (hash) {
      fs.unlinkSync(tarPath)
      return hash
    })
  })
}

function hashFile (file) {
  return new Promise(function (resolve, reject) {
    checksum.file(file, {algorithm: 'sha256'}, function (err, sum) {
      if (err) {
        // If the file doesn't exist return null
        if (err.code === 'ENOENT') return resolve(null)
        return reject(err)
      }
      resolve(sum)
    })
  })
}

function hash (object) {
  // Check if object exists
  return new Promise(function (resolve, reject) {
    fs.stat(object, function (err, stats) {
      if (err) {
        // If it doesn't exist return null
        if (err.code === 'ENOENT') return resolve(null)
        return reject(err)
      }
      resolve(stats)
    })
  }).then(function (stats) {
    if (!stats) return null
    if (stats.isDirectory()) return hashDir(object)
    if (stats.isFile()) return hashFile(object)
  })
}

module.exports = hash
