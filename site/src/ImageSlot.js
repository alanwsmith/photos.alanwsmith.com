export default function ImageSlot({ item, windowWidth, windowHeight }) {
  console.log(document.documentElement.clientWidth)
  console.log(document.documentElement.clientHeight)

  const dimensions = {
    image: {
      ratio: item.image_ratio,
      width: item.original_width,
      height: item.original_height,
    },
    viewport: {
      width: windowWidth,
      height: windowHeight,
    },
    output: {},
    padding: {},
    border: {},
  }

  // Adjust the size down based on how big the window is:
  if (dimensions.viewport.width > 1400) {
    dimensions.viewport.width = dimensions.viewport.width - 200
    dimensions.padding.sides = 30
    dimensions.padding.top = 30
    dimensions.padding.bottom = 50
    dimensions.border.sides = 30
    dimensions.border.top = 30
    dimensions.border.bottom = 50
  } else if (dimensions.viewport.width > 1000) {
    dimensions.viewport.width = dimensions.viewport.width - 240
    dimensions.padding.sides = 4
    dimensions.padding.top = 4
    dimensions.padding.bottom = 4
    dimensions.border.sides = 90
    dimensions.border.top = 90
    dimensions.border.bottom = 110
  } else if (dimensions.viewport.width > 800) {
    dimensions.viewport.width = dimensions.viewport.width - 210
    dimensions.padding.sides = 4
    dimensions.padding.top = 4
    dimensions.padding.bottom = 4
    dimensions.border.sides = 72
    dimensions.border.top = 72
    dimensions.border.bottom = 98
  } else if (dimensions.viewport.width > 660) {
    dimensions.viewport.width = dimensions.viewport.width - 160
    dimensions.padding.sides = 4
    dimensions.padding.top = 4
    dimensions.padding.bottom = 4
    dimensions.border.sides = 50
    dimensions.border.top = 50
    dimensions.border.bottom = 70
  } else if (dimensions.viewport.width > 575) {
    dimensions.viewport.width = dimensions.viewport.width - 140
    dimensions.padding.sides = 4
    dimensions.padding.top = 4
    dimensions.padding.bottom = 4
    dimensions.border.sides = 44
    dimensions.border.top = 44
    dimensions.border.bottom = 60
  } else {
    dimensions.viewport.width = dimensions.viewport.width - 70
    dimensions.padding.sides = 2
    dimensions.padding.top = 2
    dimensions.padding.bottom = 2
    dimensions.border.sides = 18
    dimensions.border.top = 18
    dimensions.border.bottom = 48
  }

  // reduce viewport height a little for padding if it's what hits
  dimensions.viewport.height = dimensions.viewport.height - 60

  dimensions.viewport.ratio =
    dimensions.viewport.height / dimensions.viewport.width

  if (dimensions.image.ratio >= dimensions.viewport.ratio) {
    dimensions.type = 'image over viewport'
    dimensions.output.height = Math.min(
      dimensions.image.height,
      dimensions.viewport.height
    )
    dimensions.output.width = Math.floor(
      (dimensions.image.width / dimensions.image.height) *
        dimensions.output.height
    )
  } else {
    dimensions.type = 'viewport over image'
    dimensions.output.width = Math.min(
      dimensions.image.width,
      dimensions.viewport.width
    )
    dimensions.output.height = Math.floor(
      dimensions.output.width * dimensions.image.ratio
    )
  }

  console.dir(dimensions)

  return (
    <>
      <img
        style={{
          backgroundColor: 'black',
          paddingLeft: `${dimensions.padding.sides}px`,
          paddingRight: `${dimensions.padding.sides}px`,
          paddingTop: `${dimensions.padding.top}px`,
          paddingBottom: `${dimensions.padding.bottom}px`,
          borderTop: `${dimensions.border.top}px solid white`,
          borderBottom: `${dimensions.border.bottom}px solid white`,
          borderLeft: `${dimensions.border.sides}px solid white`,
          borderRight: `${dimensions.border.sides}px solid white`,
        }}
        srcSet={item.srcset}
        sizes={`${dimensions.output.width}px`}
        width={dimensions.output.width}
        height={dimensions.output.height}
      />
    </>
  )
}
