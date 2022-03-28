#!/usr/bin/env node

const { listDir } = require('./listDir')
const configs = require('./configs')
const fs = require('fs')

const config = configs.dev

const file_list = listDir(config.local_source_root)

const json_data = {
  list: [],
}

for (const file of file_list) {
  // console.log(file)
  try {
    const data = JSON.parse(fs.readFileSync(file.full_path, 'utf8'))
    const srcset = []
    for (const size of data.sizes) {
      srcset.push(`${size.url_dest_path} ${size.width}w`)
    }
    data.srcset = srcset.join(', ')
    json_data.list.push(data)
  } catch (err) {}
}


json_data.list.reverse()

console.log(json_data)

fs.writeFileSync(config.json_storage_path, JSON.stringify(json_data, null, 2))
