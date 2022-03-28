export default function ImageSlot({ item, windowWidth, windowHeight }) {
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
    spacing: 0,
  }

  const settings = [
    {
      padding: { top: 0, sides: 0, bottom: 0 },
      border: { top: 0, sides: 0, bottom: 0 },
    },
    {
      padding: { top: 2, sides: 2, bottom: 2 },
      border: { top: 10, sides: 10, bottom: 10 },
    },
    {
      padding: { top: 20, sides: 20, bottom: 20 },
      border: { top: 20, sides: 20, bottom: 20 },
    },
  ]

  let output_setting = 0

  dimensions.viewport.ratio =
    dimensions.viewport.height / dimensions.viewport.width

  const spacings = [
    {
      width: 10,
      height: 10,
      paddingSides: 2,
      paddingTop: 2,
      paddingBottom: 2,
      borderSides: 10,
      borderTop: 10,
      borderBottom: 10,
      color: 'white',
    },
    {
      width: 24,
      height: 24,
      paddingSides: 3,
      paddingTop: 3,
      paddingBottom: 3,
      borderSides: 8,
      borderTop: 8,
      borderBottom: 26,
      color: 'white',
    },
    {
      width: 30,
      height: 30,
      paddingSides: 4,
      paddingTop: 4,
      paddingBottom: 4,
      borderSides: 30,
      borderTop: 30,
      borderBottom: 50,
      color: 'white',
    },
    {
      width: 30,
      height: 30,
      paddingSides: 4,
      paddingTop: 4,
      paddingBottom: 4,
      borderSides: 62,
      borderTop: 62,
      borderBottom: 70,
      color: 'white',
    },
  ]

  if (dimensions.viewport.height > 500 && dimensions.viewport.width > 860) {
    dimensions.spacing = 3
  } else if (
    dimensions.viewport.height > 380 &&
    dimensions.viewport.width > 480
  ) {
    dimensions.spacing = 2
  } else if (
    dimensions.viewport.height > 180 &&
    dimensions.viewport.width > 180
  ) {
    dimensions.spacing = 1
  }

  if (dimensions.image.ratio >= dimensions.viewport.ratio) {
    dimensions.type = 'image over viewport'
    dimensions.output.height = Math.min(
      dimensions.image.height,
      dimensions.viewport.height - spacings[dimensions.spacing].height
    )

    dimensions.output.width = Math.floor(
      (dimensions.image.width / dimensions.image.height) *
        dimensions.output.height
    )
  } else {
    dimensions.type = 'viewport over image'
    dimensions.output.width = Math.min(
      dimensions.image.width,
      dimensions.viewport.width - spacings[dimensions.spacing].width
    )
    dimensions.output.height = Math.floor(
      dimensions.output.width * dimensions.image.ratio
    )
  }

  // adjust the width based off the spacing settings
  dimensions.output.width =
    dimensions.output.width -
    spacings[dimensions.spacing].paddingSides * 2 -
    spacings[dimensions.spacing].borderSides * 2

  dimensions.output.height = Math.floor(
    dimensions.output.width * dimensions.image.ratio
  )

  // adjust height down if necessary
  const test_height =
    dimensions.viewport.height -
    spacings[dimensions.spacing].height -
    spacings[dimensions.spacing].paddingTop -
    spacings[dimensions.spacing].paddingBottom -
    spacings[dimensions.spacing].borderTop -
    spacings[dimensions.spacing].borderBottom

  if (dimensions.output.height > test_height) {
    dimensions.output.height = test_height
    dimensions.output.width = Math.floor(
      (dimensions.image.width / dimensions.image.height) *
        dimensions.output.height
    )
  }

  // // adjust height down if necessary
  // if (dimensions.output.height > dimensions.viewport.height - 40) {
  //   dimensions.output.height = dimensions.output.height - 40
  //   dimensions.output.width = Math.floor(
  //     (dimensions.image.width / dimensions.image.height) *
  //       dimensions.output.height
  //   )
  // }

  // dimensions.minDimensions = {
  //   width: Math.min(dimensions.viewport.width - 40, dimensions.output.width),
  //   height: Math.min(dimensions.viewport.height - 40, dimensions.output.height),
  // }
  // dimensions.minDimensions.ratio =
  //   dimensions.minDimensions.height / dimensions.minDimensions.width

  // console.log(dimensions)

  return (
    <>
      <img
        style={{
          backgroundColor: 'black',
          paddingLeft: `${spacings[dimensions.spacing].paddingSides}px`,
          paddingRight: `${spacings[dimensions.spacing].paddingSides}px`,
          paddingTop: `${spacings[dimensions.spacing].paddingTop}px`,
          paddingBottom: `${spacings[dimensions.spacing].paddingBottom}px`,
          borderTop: `${spacings[dimensions.spacing].borderTop}px solid ${
            spacings[dimensions.spacing].color
          }`,
          borderBottom: `${spacings[dimensions.spacing].borderBottom}px solid ${
            spacings[dimensions.spacing].color
          }`,
          borderLeft: `${spacings[dimensions.spacing].borderSides}px solid ${
            spacings[dimensions.spacing].color
          }`,
          borderRight: `${spacings[dimensions.spacing].borderSides}px solid ${
            spacings[dimensions.spacing].color
          }`,
        }}
        srcSet={item.srcset}
        sizes={`${dimensions.output.width}px`}
        width={dimensions.output.width}
        height={dimensions.output.height}
      />
    </>
  )
}
