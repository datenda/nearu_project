import { getEpisode } from "@/lib/api"
import Image from "next/image"
import BackButton from "@/components/BackButton"
import CustomHeading from "@/components/customHeading"

interface Props {
  params: {
    id: string
  }
}

export default async function EpisodePage({ params }: Props) {
  const { id } = await params
  const episode = await getEpisode(id)
  const summaryHtml = episode.summary ?? ""

  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-8">
      <BackButton appearance="primary" />

      <div className="mt-4 mb-8">
        <CustomHeading
          text={episode.name}
          size="xxlarge"
          color="color.text.inverse"
        />
      </div>

      {episode.image?.original && (
        <div className="w-full flex justify-center mb-8">
          <Image
            src={episode.image.original}
            alt={`${episode.name} cover`}
            width={500}
            height={750}
            className="rounded-xl shadow-lg border border-gray-700"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none text-gray-200">
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: summaryHtml }}
        />
      </div>
    </main>
  )
}
