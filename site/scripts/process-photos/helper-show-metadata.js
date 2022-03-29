#!/usr/bin/env node

// This just outputs the metadata for a
// file to make it easier to see what's up

const ExifReader = require('exifreader')

const input_file = '/Users/alan/Photos/web-exports/aws-2022-0317-1945-0036.jpg'

async function runIt() {
  const tags = await ExifReader.load(input_file)
  console.dir(tags)
  console.log(tags.SubjectCode.description)
}

runIt()
