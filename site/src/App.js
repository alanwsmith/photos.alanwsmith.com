import './App.css'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const images = [
  { name: '129a7654.jpg' },
  { name: 'aws00036.jpg' },
  { name: 'aws00040.jpg' },
  { name: 'aws00044.jpg' },
  { name: 'dsc00001.jpg' },
  { name: 'dsc00006.jpg' },
  { name: 'dsc00010.jpg' },
  { name: 'dsc00016.jpg' },
  { name: 'dsc00019.jpg' },
  { name: 'dsc00027.jpg' },
]

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

export default function PhotoSite() {
  const initialCount = 4
  const [infinityIndex, setInfinityIndex] = useState(initialCount)
  const [items, setItems] = useState(images.slice(0, initialCount))
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = () => {
    console.log(items)
    console.log('loading more')
    const nextInfinityIndex = infinityIndex + initialCount
    setItems(items.concat(images.slice(infinityIndex, nextInfinityIndex)))
    setInfinityIndex(nextInfinityIndex)
    if (items.length >= images.length) {
      setHasMore(false)
    }
  }

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>~ fin ~</p>}
      >
        {items.map((item, item_index) => (
          <div key={`item_${item_index}`} style={{ fontSize: '8rem' }}>
            <img src={`/raw-images/${item.name}`} width="700" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}
