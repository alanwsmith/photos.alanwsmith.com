import './App.css'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import photos from './photos.json'
import ImageSlot from './ImageSlot'
import { useWindowSize } from 'react-use'

function set_photo_sizes() {
  const window_width = document.documentElement.clientWidth || window.innerWidth
  const window_height =
    document.documentElement.clientHeight || window.innerHeight
  const window_ratio = window_height / window_width
  console.log(window_width)
  console.log(window_height)
  console.log(window_ratio)
  const max_container_width = 1200
  for (const photo of photos.list) {
    if (photo.image_ratio >= window_ratio) {
      photo.height = 'aasdf'
    } else {
      photo.width = 'qqq'
    }
    photo.new_thing = 'asdf'
    console.dir(photo)
  }
}

// set_photo_sizes()

function App() {
  const fetchData = () => {
    console.log('fetching data')
    const startIndex = items.length
    const endIndex = startIndex + itemsToGet
    setItems(items.concat(photos.list.slice(startIndex, endIndex)))
    if (items.length >= photos.list.length) {
      setHasMore(false)
    }
  }
  const itemsToGet = 1
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState(photos.list.slice(0, itemsToGet))
  const { width, height } = useWindowSize()

  return (
    <div className="App">
      <header>
        <h1>alan w. smith</h1>
      </header>
      <main>
        <div id="scroll_wrapper">
          <div>
            {width} - {height}
          </div>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading</h4>}
            endMessage={<div id="end_of_line"> ~ fin ~</div>}
          >
            {items.map((item, indx) => (
              <div className="p3" key={`item_${indx}`}>
                <ImageSlot
                  item={item}
                  windowWidth={width}
                  windowHeight={height}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  )
}

export default App
