import { getShow } from "@/lib/api"
import ShowContentClient from "@/components/ShowContentClient"
import FavoritesDropdown from "@/components/FavoritesDropdown"

export default async function ShowPage() {
  const show = await getShow()

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-[#1E1E1E] flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mx-4">NearU Viewer</h1>
        <FavoritesDropdown episodes={show._embedded.episodes} />
      </header>

      <main>
        <ShowContentClient show={show} />
      </main>
    </div>
  )
}
