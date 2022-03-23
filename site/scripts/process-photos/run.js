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

console.log(dest_dir)
const file_list = listDir(source_dir)

const widths = [
  250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000,
]

async function getMetadata(file_path) {
  const metadata = await sharp(file_path).metadata()
  return metadata
}

const output_json = []

async function doTheThing() {
  console.log('starting')
  await file_list.forEach(async (file) => {
    const output_dir = path.join(dest_dir, file.sub_dir, file.name_only)
    fs.mkdirSync(output_dir, { recursive: true })

    const metadata = await getMetadata(file.full_path)
    const image_width = metadata.width
    const image_height = metadata.height

    for (let new_width of widths) {
      // await widths.forEach(async (new_width) => {
      // only output if the raw image is larger than the target width
      if (image_width > new_width) {
        const new_height = Math.round((image_height / image_width) * new_width)
        const dest_path = path.join(
          output_dir,
          `${new_width}x${new_height}.jpg`
        )

        // console.log(file.full_path)
        // console.log(dest_path)

        sharp(file.full_path).resize(new_width, new_height).toFile(dest_path)
        output_json.push(file)
        // console.log('here')
      }
    }
  })

  console.log('finishing')
}

console.log('ping')
;(async () => {
  await doTheThing()
  console.log(output_json)
})()

// aawait wait doTheThing()
// ;(async () => console.log(await doTheThing()))()
console.log(output_json)
console.log('pong')

// async function testIt2() {
//   const result = sharp(
//     '/Users/alan/workshop/photos.alanwsmith.com/raw_images/000001--2022-03--First-Images-With-The-New-Camera/dsc00027.jpg'
//   ).resize(200)
//   console.log('Do something')
//   return result
//   return anyOtherResultComputedEarlier
// }

// async function testIt() {
//   const asfasdffads = sharp(
//     '/Users/alan/workshop/photos.alanwsmith.com/raw_images/000001--2022-03--First-Images-With-The-New-Camera/dsc00027.jpg'
//   )
//     .resize(200)
//     .toFile(
//       '/Users/alan/workshop/photos.alanwsmith.com/site/public/collection-images/000001--2022-03--First-Images-With-The-New-Camera/dsc00027/4000x2733.jpg'
//     )
//     .then()
//   // /Users/alan/workshop/photos.alanwsmith.com/site/public/coll
//   // ection-images/000001--2022-03--First-Images-With-The-New-Ca
//   // mera/dsc00027/4000x2733.jpg).resize(new_width, new_height).toFile(dest_path)
// }

// ;(async () => console.log(await testIt2()))()
// console.log('here')

// async function test2() {
//   console.log(await testIt())
// }

// test2()
// console.log('here')

// const output_json = doTheThing()

// console.log(output_json)
