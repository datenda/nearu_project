"use client"

import { useState } from "react"
import Image from "next/image"
import Heading from "@atlaskit/heading"
import Button from "@atlaskit/button/new"
import { Show, Episode } from "@/lib/types"
import EpisodeList from "./EpisodeList"

interface Props {
  show: Show
  pageSize?: number
}

export default function ShowContentClient({ show, pageSize = 5 }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const episodes: Episode[] = show._embedded.episodes
  const totalPages = Math.ceil(episodes.length / pageSize)

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Hero section */}
      <div
        className="relative flex items-center h-100 p-6 bg-center bg-cover"
        style={{ backgroundImage: `url(${show.image?.original})` }}
      >
        <div className="bg-black/60 p-4 rounded-xl max-w-lg">
          <Heading size="large" color="color.text.inverse">
            {show.name}
          </Heading>
          <p
            className="mt-2 text-gray-300"
            dangerouslySetInnerHTML={{ __html: show.summary }}
          />
        </div>
      </div>

      <div className="h-6" />

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6 mx-4">
        {/* Show image */}
        {show.image?.original && (
          <div className="shrink-0 mx-auto md:mx-0">
            <Image
              src={show.image.original}
              width={300}
              height={450}
              className="rounded-xl"
              alt={show.name}
            />
          </div>
        )}

        {/* Episodes list */}
        <div className="flex-1">
          <Heading size="medium" color="color.text.inverse">
            Episodes
          </Heading>

          <EpisodeList
            episodes={episodes}
            currentPage={currentPage}
            pageSize={pageSize}
          />

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-5">
            <Button
              isDisabled={currentPage === 1}
              onClick={handlePrev}
              appearance="subtle"
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              isDisabled={currentPage === totalPages}
              onClick={handleNext}
              appearance="subtle"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
