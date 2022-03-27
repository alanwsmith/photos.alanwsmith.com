#!/usr/bin/env node

const sharp = require('sharp')
const ExifReader = require('exifreader')

const input_file =
  '/Users/alan/Photos/web-exports/aws-2022-0315-1507-0001.jpg'

// async function runIt() {
//   const input_file =
//     '/Users/alan/Photos/raw/2022/Misc-2022-03-22/_web/aws-2022-0322-1510-0046.jpg'
//   const metadata = await sharp(input_file).metadata()
//   console.log(metadata)
// }

async function runIt() {
  const tags = await ExifReader.load(input_file)
  console.dir(tags)
  console.log(tags.description.description)
}

runIt()
