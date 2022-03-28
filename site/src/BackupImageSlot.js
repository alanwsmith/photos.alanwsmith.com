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
    dimensions.viewport.width = dimensions.viewport.width - 280
    dimensions.padding.sides = 9
    dimensions.padding.top = 9
    dimensions.padding.bottom = 9
    dimensions.border.sides = 100
    dimensions.border.top = 100
    dimensions.border.bottom = 130
    // dimensions.viewport.height = dimensions.viewport.height - 280
  } else if (dimensions.viewport.width > 1000) {
    dimensions.viewport.width = dimensions.viewport.width - 252
    dimensions.padding.sides = 8
    dimensions.padding.top = 8
    dimensions.padding.bottom = 8
    dimensions.border.sides = 90
    dimensions.border.top = 90
    dimensions.border.bottom = 118
    // dimensions.viewport.height = dimensions.viewport.height - 260
  } else if (dimensions.viewport.width > 850) {
    dimensions.viewport.width = dimensions.viewport.width - 178
    dimensions.padding.sides = 6
    dimensions.padding.top = 6
    dimensions.padding.bottom = 6
    dimensions.border.sides = 68
    dimensions.border.top = 68
    dimensions.border.bottom = 98
    // dimensions.viewport.height = dimensions.viewport.height - 110
  } else if (dimensions.viewport.width > 740) {
    dimensions.viewport.width = dimensions.viewport.width - 90
    dimensions.padding.sides = 4
    dimensions.padding.top = 4
    dimensions.padding.bottom = 4
    dimensions.border.sides = 26
    dimensions.border.top = 26
    dimensions.border.bottom = 70
    // dimensions.viewport.height = dimensions.viewport.height - 78
  } else if (dimensions.viewport.width > 580) {
    dimensions.viewport.width = dimensions.viewport.width - 80
    dimensions.padding.sides = 4
    dimensions.padding.top = 4
    dimensions.padding.bottom = 4
    dimensions.border.sides = 20
    dimensions.border.top = 20
    dimensions.border.bottom = 60
    // dimensions.viewport.height = dimensions.viewport.height - 68
  } else {
    dimensions.viewport.width = dimensions.viewport.width - 70
    dimensions.padding.sides = 3
    dimensions.padding.top = 3
    dimensions.padding.bottom = 3
    dimensions.border.sides = 14
    dimensions.border.top = 14
    dimensions.border.bottom = 46
    // dimensions.viewport.height = dimensions.viewport.height - 52
  }

  // reduce viewport height a little for padding if it's what hits
  // dimensions.viewport.height = dimensions.viewport.height - 60

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

  console.log(dimensions)

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
