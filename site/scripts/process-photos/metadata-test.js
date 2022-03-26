#!/usr/bin/env node

const sharp = require('sharp')

async function runIt() {
  const input_file =
    '/Users/alan/Photos/raw/2022/First-Shots--2022-03-15/DSC00002.ARW'
  const metadata = await sharp(input_file).metadata()
  console.log(metadata)
}

runIt()
