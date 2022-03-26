#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { listDir } = require('./listDir')
const configs = require('./configs.json')

// Makes an output dir for every image
// Puts all the different copies of the image
// undreneath it for the different sizes

// console.log(dest_dir)
// const file_list = listDir(source_dir)

// const widths = [
//   250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000,
// ]

async function getMetadata(file_path) {
  const metadata = await sharp(file_path).metadata()
  return metadata
}

const output_json = []

//////////////////////////////////////////////////////////////

function make_directory(file_details) {
  if (fs.existsSync(file_details.dest_dir) === false) {
    console.log(`- Making destination dir: ${file_details.dest_dir}`)
    fs.mkdirSync(file_details.dest_dir, { recursive: true })
  }
}

//////////////////////////////////////////////////////////////

function set_dest_dir(dest_root, file_details) {
  file_details.dest_dir = path.join(
    dest_root,
    ...file_details.sub_dirs,
    file_details.name_only
  )
  return file_details
}

//////////////////////////////////////////////////////////////

async function get_original_dimensions(file_details) {
  const metadata = await sharp(file_details.full_path).metadata()
  file_details.original_width = metadata.width
  file_details.original_height = metadata.height
  file_details.image_ratio = metadata.height / metadata.width
  return file_details
}

//////////////////////////////////////////////////////////////

function set_dest_sizes(sizes, file_details) {
  file_details.sizes = []
  for (const size of sizes) {
    if (size <= file_details.original_width) {
      const size_details = {}
      size_details.width = size
      size_details.height = Math.floor(size * file_details.image_ratio)
      size_details.dest_path = path.join(
        file_details.dest_dir,
        `${size_details.width}x${size_details.height}.jpg`
      )
      file_details.sizes.push(size_details)
    }
  }
  return file_details
}

function get_file_list(source_root) {
  const file_list = []
  for (const file_details of listDir(config.source_root)) {
    if (
      file_details.sub_dirs.find((element) => element === '_web') !== undefined
    ) {
      file_list.push(file_details)
    }
  }
  return file_list
}

//////////////////////////////////////////////////////////////

async function runIt() {
  console.log('--- Creating Responsive Images ---')
  // const file_list = listDir(config.source_root)

  const file_list = get_file_list(config.source_root)

  await file_list.forEach(async (file_details) => {
    file_details = set_dest_dir(config.dest_root, file_details)
    console.log(file_details)
    file_details = await get_original_dimensions(file_details)
    file_details = set_dest_sizes(config.sizes, file_details)

    make_directory(file_details)

    await file_details.sizes.forEach(async (size) => {
      if (fs.existsSync(size.dest_path) === false) {
        console.log(`Making: ${size.dest_path}`)
        await sharp(file_details.full_path)
          .resize(size.width, size.height)
          .toFile(size.dest_path)
      }
    })

    // const output_dir = path.join(dest_dir, ...file.sub_dirs, file.name_only)
    // console.log(output_dir)
    // fs.mkdirSync(output_dir, { recursive: true })
    // const metadata = await getMetadata(file.full_path)
    // const image_width = metadata.width
    // const image_height = metadata.height
    // for (let new_width of widths) {
    //   // await widths.forEach(async (new_width) => {
    //   // only output if the raw image is larger than the target width
    //   if (image_width > new_width) {
    //     const new_height = Math.round((image_height / image_width) * new_width)
    //     // const dest_path = path.join(
    //     //   output_dir,
    //     //   `${new_width}x${new_height}.jpg`
    //     // )
    //     // console.log(file.full_path)
    //     // console.log(dest_path)
    //     // sharp(file.full_path).resize(new_width, new_height).toFile(dest_path)
    //     // output_json.push(file)
    //     // console.log('here')
    //   }
    // }
  })

  console.log('--- Finished making images ---')
}

// const source_dir = path.join(__dirname, '..', '..', '..', 'raw_images')

// const dest_dir = path.join(
//   __dirname,
//   '..',
//   '..',
//   '..',
//   'site',
//   'public',
//   'collection-images'
// )

const config = configs.dev
runIt(config)

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
