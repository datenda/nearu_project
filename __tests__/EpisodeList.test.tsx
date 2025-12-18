// __tests__/EpisodeList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import EpisodeList from "@/components/EpisodeList"
import { Episode } from "@/lib/types"
import { vi, describe, it, beforeEach, expect } from "vitest"

// Mock Next.js useRouter
const pushMock = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}))

// Sample episodes
const episodes: Episode[] = [
  {
    id: 1,
    name: "Pilot",
    summary: "The first episode",
    image: { medium: "", original: "" },
  },
  {
    id: 2,
    name: "Episode 2",
    summary: "The second episode",
    image: { medium: "", original: "" },
  },
]

describe("EpisodeList", () => {
  beforeEach(() => {
    localStorage.clear()
    pushMock.mockClear()
  })

  it("renders episode names", () => {
    render(<EpisodeList episodes={episodes} />)
    expect(screen.getByText(/Pilot/)).toBeInTheDocument()
    expect(screen.getByText(/Episode 2/)).toBeInTheDocument()
  })

  it("redirects when an episode is clicked", () => {
    render(<EpisodeList episodes={episodes} />)
    const episodeButton = screen.getByRole("button", { name: /Pilot/ })
    fireEvent.click(episodeButton)
    expect(pushMock).toHaveBeenCalledWith("/episodes/1")
  })

  it("toggles favorite and updates localStorage", () => {
    render(<EpisodeList episodes={episodes} />)

    // Get all favorite buttons
    const favoriteButtons = screen.getAllByRole("button", {
      name: /Add to favorites/i,
    })

    // Click the first favorite button
    fireEvent.click(favoriteButtons[0])

    // Check that localStorage was updated
    const stored = JSON.parse(localStorage.getItem("favoriteEpisodes") || "[]")
    expect(stored).toContain(1)

    // Click again to remove from favorites
    fireEvent.click(favoriteButtons[0])
    const updated = JSON.parse(localStorage.getItem("favoriteEpisodes") || "[]")
    expect(updated).not.toContain(1)
  })
})
