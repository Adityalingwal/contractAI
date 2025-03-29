export interface Gig {
  id: number
  title: string
  description: string
  category: string
  budget: string
  details: string
}

export interface GigDetailViewProps {
  gig: Gig
  onBack: () => void
}