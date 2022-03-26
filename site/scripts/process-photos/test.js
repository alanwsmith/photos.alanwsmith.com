#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const listDir = function (
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
      const fileDetails = {
        initial_root: rootDir,
        sub_dir: subDir,
        name: fileName,
        name_only: path.parse(fileName).name,
        extension: path.parse(fileName).ext,
        full_path: path.join(rootDir, subDir, fileName),
        relative_path: path.join(subDir, fileName),
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

///////////////////////////////////////////////////

async function processImages() {
  const output_json = []
  // config
  const source_dir = path.join(__dirname, '..', '..', '..', 'raw_images')
  const dest_dir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'site',
    'public',
    'collection-images'
  )
  const widths = [
    250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000,
  ]
  const file_list = listDir(source_dir)
  for (let file of file_list) {
    const output_dir = path.join(dest_dir, file.sub_dir, file.name_only)
    fs.mkdirSync(output_dir, { recursive: true })
    const metadata = await sharp(file.full_path).metadata()
    const image_width = metadata.width
    const image_height = metadata.height
    console.log(image_width)

    for (let new_width of widths) {
      if (image_width > new_width) {
        const new_height = Math.round((image_height / image_width) * new_width)
        const dest_path = path.join(
          output_dir,
          `${new_width}x${new_height}.jpg`
        )
        sharp(file.full_path).resize(new_width, new_height).toFile(dest_path)
        output_json.push({ file: file, widht: new_width, height: new_height })
      }
    }
  }
  console.log(output_json)
}

processImages()
