const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const knownDirectories = ['common', 'setup']

const isRootDirectory = (source) => {
  return lstatSync(join('src', source)).isDirectory() && !knownDirectories.includes(source)
}

const getRootDirectories = () => {
  return readdirSync('src').filter(isRootDirectory)
}

function upperFirst(string) {
  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : string
}

function camelize(text, separator) {
  // Assume separator is _ if no one has been provided.
  if (typeof separator === 'undefined') {
    separator = '_'
  }

  // Cut the string into words
  var words = text.split(separator)

  // Concatenate all capitalized words to get camelized string
  var result = ''
  for (var i = 0; i < words.length; i++) {
    var word = words[i]
    var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
    result += capitalizedWord
  }

  return result
}

module.exports = {
  camelize,
  getRootDirectories,
  upperFirst,
}
