import './App.css'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'

function App() {
  const photos = [
    {
      height: '741',
      name: 'dsc00006--1920x741.jpg',
      width: '1920',
    },
    {
      height: '1373',
      name: 'aws00035--1920x1373.jpg',
      width: '1920',
    },
    {
      height: '1316',
      name: 'dsc00019--1920x1316.jpg',
      width: '1920',
    },
    {
      height: '1920',
      name: 'aws00036--1748x1920.jpg',
      width: '1748',
    },
    {
      height: '1313',
      name: 'aws00044--1920x1313.jpg',
      width: '1920',
    },
    {
      height: '1266',
      name: '129a7654--1920x1266.jpg',
      width: '1920',
    },
    {
      height: '1233',
      name: 'dsc00010--1920x1233.jpg',
      width: '1920',
    },
    {
      height: '1280',
      name: 'aws00040--1920x1280.jpg',
      width: '1920',
    },
    {
      height: '1312',
      name: 'dsc00027--1920x1312.jpg',
      width: '1920',
    },
    {
      height: '1435',
      name: 'dsc00016--1920x1435.jpg',
      width: '1920',
    },
    {
      height: '1280',
      name: 'dsc00001--1920x1280.jpg',
      width: '1920',
    },
  ]

  const window_height = window.visualViewport.width
  console.log(window_height)

  const fetchData = () => {
    console.log('fetching data')
    const startIndex = items.length
    const endIndex = startIndex + itemsToGet
    setItems(items.concat(photos.slice(startIndex, endIndex)))
    if (items.length >= photos.length) {
      setHasMore(false)
    }
  }

  const itemsToGet = 4
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState(photos.slice(0, itemsToGet))

  return (
    <div className="App">
      <header>
        <h1>alan w. smith</h1>
      </header>
      <main>
        <div id="scroll_wrapper">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading</h4>}
            endMessage={<div id="end_of_line"> ~ fin ~</div>}
          >
            {items.map((item, indx) => (
              <div className="photo" key={`item_${indx}`}>
                <img src={`/test-images/${item.name}`} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  )
}

export default App
