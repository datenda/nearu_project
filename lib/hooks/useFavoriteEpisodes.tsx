"use client"
import { useState, useEffect } from "react"

export function useFavoriteEpisodes() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem("favoriteEpisodes")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "favoriteEpisodes") {
        setFavorites(e.newValue ? JSON.parse(e.newValue) : [])
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return favorites
}
