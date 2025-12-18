import { Show, Episode } from "./types"

//For simplicity i will hardcode the api base url here, otherwise it can be stored in env variables
const BASE_URL = "https://api.tvmaze.com"

export async function getShow(): Promise<Show> {
  const res = await fetch(
    `${BASE_URL}/singlesearch/shows?q=powerpuff+girls&embed=episodes`,
    { next: { revalidate: 60 * 60 } } // SSG + ISR
  )

  if (!res.ok) throw new Error("Failed to fetch show")

  return res.json()
}

export async function getEpisode(id: string): Promise<Episode> {
  const res = await fetch(`${BASE_URL}/episodes/${id}`, {
    cache: "force-cache",
  })

  if (!res.ok) throw new Error("Failed to fetch episode")

  return res.json()
}
