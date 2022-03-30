import './App.css'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import photos from './photos.json'
import ImageSlot from './ImageSlot'
import { useWindowSize } from 'react-use'

function App() {
  const fetchData = () => {
    console.log('fetching data')
    const startIndex = items.length
    const endIndex = startIndex + itemsToGet
    setItems(items.concat(photos.list.slice(startIndex, endIndex)))
    console.dir(photos.list)
    if (items.length >= photos.list.length) {
      setHasMore(false)
    }
  }
  const itemsToGet = 2
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState(photos.list.slice(0, itemsToGet))
  const { width, height } = useWindowSize()

  return (
    <div className="App">
      <header>
        <h3>alan w. smith</h3>
        <p>
          Welcome to my photo site. I&apos;m just getting it started. Nothing
          more than a single page to scroll with a few images right now.
          We&apos;ll see what it becomes.{' '}
        </p>
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
