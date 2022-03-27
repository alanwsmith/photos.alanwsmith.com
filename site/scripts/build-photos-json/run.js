const { listDir } = require('./listDir')
const configs = require('./configs')
const fs = require('fs')

const config = configs.dev

const file_list = listDir(config.local_source_root)

const json_data = {
  photos: [],
}

for (const file of file_list) {
  console.log(file)
  try {
    const data = fs.readFileSync(file.full_path, 'utf8')
    json_data.photos.push(JSON.parse(data))
    console.log(data)
  } catch (err) {}
}

console.log(json_data)

fs.writeFileSync(config.json_storage_path, JSON.stringify(json_data))
