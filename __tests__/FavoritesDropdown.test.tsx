// __tests__/FavoritesDropdown.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import FavoritesDropdown from "@/components/FavoritesDropdown"
import { Episode } from "@/lib/types"
import { vi, describe, it, beforeEach, expect } from "vitest"

// Mock Next.js useRouter
const pushMock = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}))

// Sample episodes with required fields
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

describe("FavoritesDropdown", () => {
  beforeEach(() => {
    localStorage.setItem("favoriteEpisodes", JSON.stringify([1]))
    pushMock.mockClear()
  })

  it("renders only favorite episodes", () => {
    render(<FavoritesDropdown episodes={episodes} />)
    expect(screen.getByText("Pilot")).toBeInTheDocument()
    expect(screen.queryByText("Episode 2")).toBeNull()
  })

  it("redirects to episode when selected", () => {
    render(<FavoritesDropdown episodes={episodes} />)
    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "1" } })
    expect(pushMock).toHaveBeenCalledWith("/episodes/1")
  })

  it("updates when favoritesUpdated event is dispatched", () => {
    render(<FavoritesDropdown episodes={episodes} />)
    expect(screen.queryByText("Episode 2")).toBeNull()

    // Wrap state updates in act
    fireEvent(window, new CustomEvent("favoritesUpdated", { detail: [1, 2] }))

    expect(screen.getByText("Episode 2")).toBeInTheDocument()
  })
})
