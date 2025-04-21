export type Profile = {
  id: string
  email: string
  first_name?: string
  last_name?: string
  avatar_url?: string
  discovery_data?: DiscoveryData
  resume_data?: string
  role_selected?: string
  roadmap_data?: RoadmapData
  created_at?: string
  updated_at?: string
}

export type RoadmapData = {
  step1: RoadmapStep
  step2: RoadmapStep
  step3: RoadmapStep
  step4: RoadmapStep
}

export type RoadmapStep = {
  title: string
  description: string
  tasks: string[]
}

export type DiscoveryData = {
  hardSkills: string[]
  softSkills: string[]
  personalInterests: string[]
  professionalInterests: string[]
  personalValues: string[]
  professionalValues: string[]
}
