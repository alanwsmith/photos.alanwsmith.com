#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { listDir } = require('./listDir')
const configs = require('./configs.json')

// Makes an output dir for every image
// Puts all the different copies of the image
// undreneath it for the different sizes

// TODO: Clear old copies of an image for example
// if the crop of the image has changed.

//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////

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

async function make_file(file_details, size) {
  await sharp(file_details.full_path)
    .resize(size.width, size.height)
    .toFile(size.dest_path)
}

//////////////////////////////////////////////////////////////

function set_dest_base_path(file_details) {
  file_details.dest_base_path = path.join(file_details.dest_dir, 'base.jpg')
  return file_details
}

//////////////////////////////////////////////////////////////

function set_generate_files(file_details) {
  file_details.generate_files = false
  if (fs.existsSync(file_details.dest_base_path) === false) {
    file_details.generate_files = true
  } else if (
    fs.statSync(file_details.dest_base_path).mtime <
    fs.statSync(file_details.full_path).mtime
  ) {
    file_details.generate_files = true
  }
  return file_details
}

//////////////////////////////////////////////////////////////

async function make_base_file(base_width, file_details) {
  await sharp(file_details.full_path)
    .resize(base_width, null)
    .toFile(file_details.dest_base_path)
}

//////////////////////////////////////////////////////////////

async function runIt() {
  console.log('--- Creating Responsive Images ---')

  const file_list = get_file_list(config.source_root)

  await file_list.forEach(async (file_details) => {
    file_details = set_dest_dir(config.dest_root, file_details)
    file_details = set_dest_base_path(file_details)
    file_details = set_generate_files(file_details)

    if (file_details.generate_files === true) {
      console.log(file_details)
      file_details = await get_original_dimensions(file_details)
      file_details = set_dest_sizes(config.sizes, file_details)
      make_directory(file_details)
      await make_base_file(config.base_width, file_details)
      await file_details.sizes.forEach(async (size) => {
        await make_file(file_details, size)
      })
    }
  })

  console.log('--- Finished making images ---')
}

const config = configs.dev
runIt(config)
