"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Episode } from "@/lib/types"
import StarStarredIcon from "@atlaskit/icon/core/star-starred"
import StarUnstarredIcon from "@atlaskit/icon/core/star-unstarred"

interface Props {
  episodes: Episode[] // full episodes list
  currentPage?: number
  pageSize?: number
}

export default function EpisodeList({
  episodes,
  currentPage = 1,
  pageSize = 5,
}: Props) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [focusedEpisode, setFocusedEpisode] = useState<string>("")
  const router = useRouter()

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("favoriteEpisodes")
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id]

    setFavorites(updated)
    localStorage.setItem("favoriteEpisodes", JSON.stringify(updated))

    window.dispatchEvent(
      new CustomEvent("favoritesUpdated", { detail: updated })
    )
  }

  // Current page episodes
  const startIndex = (currentPage - 1) * pageSize
  const currentEpisodes = useMemo(
    () => episodes.slice(startIndex, startIndex + pageSize),
    [episodes, startIndex, pageSize]
  )

  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Live region for screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {focusedEpisode}
      </div>

      {currentEpisodes.map((ep, index) => {
        const globalIndex = startIndex + index + 1
        const isFavorite = favorites.includes(ep.id)

        return (
          <div
            key={ep.id}
            className="flex items-center gap-3 bg-[#1E1E1E] p-2 rounded-lg transition-colors hover:bg-[#2A2A2A]"
          >
            {ep.image?.medium && (
              <Image
                src={ep.image.medium}
                width={80}
                height={45}
                className="rounded-md"
                alt={`Episode ${globalIndex} image: ${ep.name}`}
              />
            )}

            <button
              type="button"
              className="flex-1 text-left text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400"
              onClick={() => router.push(`/episodes/${ep.id}`)}
              onFocus={() =>
                setFocusedEpisode(
                  `Episode ${globalIndex}: ${ep.name}. ${
                    isFavorite ? "Favorite." : "Not favorite."
                  }`
                )
              }
              aria-label={`Go to episode ${globalIndex}: ${ep.name}`}
            >
              {globalIndex}. {ep.name}
            </button>

            <button
              type="button"
              className="ml-4 text-yellow-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400"
              onClick={() => toggleFavorite(ep.id)}
              onFocus={() =>
                setFocusedEpisode(
                  `Episode ${globalIndex}: ${ep.name}. ${
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }`
                )
              }
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorite ? (
                <StarStarredIcon size="medium" label="starred" />
              ) : (
                <StarUnstarredIcon size="medium" label="unstarred" />
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
