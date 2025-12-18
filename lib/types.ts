export interface Image {
  medium?: string
  original?: string
}

export interface Episode {
  id: number
  name: string
  summary: string | null
  image: Image | null
}

export interface Show {
  id: number
  name: string
  summary: string
  image: Image
  _embedded: {
    episodes: Episode[]
  }
}
