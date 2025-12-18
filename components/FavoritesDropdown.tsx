"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Episode } from "@/lib/types"

interface Props {
  episodes: Episode[]
}

export default function FavoritesDropdown({ episodes }: Props) {
  const router = useRouter()

  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem("favoriteEpisodes")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<number[]>).detail
      setFavorites(detail)
    }
    window.addEventListener("favoritesUpdated", handler)
    return () => window.removeEventListener("favoritesUpdated", handler)
  }, [])

  const favoriteEpisodes = episodes.filter((ep) => favorites.includes(ep.id))
  if (favoriteEpisodes.length === 0) return null

  // Default to first favorite episode if it exists
  const selectedEpisodeId = favoriteEpisodes[0]?.id.toString() ?? ""

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (id) router.push(`/episodes/${id}`)
  }

  return (
    <div>
      <label htmlFor="favorites-dropdown" className="sr-only">
        Select your favorite episode
      </label>
      <select
        id="favorites-dropdown"
        onChange={handleChange}
        className="p-2 rounded border bg-[#1E1E1E] text-white mx-4"
        value={selectedEpisodeId}
        aria-label="Favorite episodes"
      >
        {favoriteEpisodes.map((ep) => (
          <option key={ep.id} value={ep.id}>
            {ep.name}
          </option>
        ))}
      </select>
    </div>
  )
}
