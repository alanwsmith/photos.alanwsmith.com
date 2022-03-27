#!/usr/bin/env python3

import json 

import os
import glob

source_dir = '/Users/alan/workshop/photos.alanwsmith.com/site/public/test-images'

os.chdir(source_dir)

file_list = glob.glob('*.jpg')

data = [] 

for f in file_list:
	parts = f.split('--')
	dimensions = parts[1].split('.')
	w, h = dimensions[0].split('x')
	data.append(
		{ "name": f, "width": w, "height": h }
	)
	
print(f'const photos = {json.dumps(data, sort_keys=True, indent=2, default=str)}')

	