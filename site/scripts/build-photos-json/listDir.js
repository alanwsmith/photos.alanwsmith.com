const fs = require('fs')
const path = require('path')

function listDir(
  rootDir,
  isRecursive = true,
  hiddenFiles = false,
  subDir = '',
  fileList = []
) {
  if (rootDir.charAt(0) !== '/') {
    rootDir = path.resolve(rootDir)
  }

  const subDirExpanded = path.join(rootDir, subDir)

  fileNames = fs.readdirSync(subDirExpanded)
  fileNames.forEach((fileName) => {
    filePath = path.join(subDirExpanded, fileName)
    subDirPath = path.join(subDir, fileName)
    if (fs.statSync(filePath).isDirectory()) {
      if (isRecursive) {
        fileList = listDir(
          rootDir,
          isRecursive,
          hiddenFiles,
          subDirPath,
          fileList
        )
      }
    } else {
      let sub_dirs = subDir.split('/')
      if (sub_dirs[0] === '') {
        sub_dirs = []
      }

      let extension = path.parse(fileName).ext
      if (extension !== '') {
        extension = extension.split('.')[1]
      }

      const fileDetails = {
        full_path: path.join(rootDir, path.join(...sub_dirs), fileName),
        initial_root: rootDir,
        sub_dirs: sub_dirs,
        name: fileName,
        name_lower_case: fileName.toLowerCase(),
        name_only: path.parse(fileName).name,
        name_only_lower_case: path.parse(fileName).name.toLowerCase(),
        extension: extension,
        extension_lower_case: extension.toLowerCase(),
      }

      if (hiddenFiles === true) {
        fileList.push(fileDetails)
      } else if (fileName.charAt(0) !== '.') {
        fileList.push(fileDetails)
      }
    }
  })

  return fileList
}

module.exports = { listDir: listDir }
