"use client"
import Heading from "@atlaskit/heading"

type CustomHeadingProps = {
  text: string
  size?: "xlarge" | "xxlarge" | "large" | "medium" | "small" | "xsmall"
  color?: React.ComponentProps<typeof Heading>["color"]
}

export default function CustomHeading({
  text,
  size = "large",
  color = "color.text",
}: CustomHeadingProps) {
  return (
    <Heading size={size} color={color}>
      {text}
    </Heading>
  )
}
