"use client"

import { useRouter } from "next/navigation"
import Button from "@atlaskit/button/new"

type BackButtonProps = {
  appearance?: "default" | "primary" | "subtle" | "warning" | "danger"
}

export default function BackButton({ appearance = "subtle" }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button appearance={appearance} onClick={() => router.back()}>
      ← Back
    </Button>
  )
}
