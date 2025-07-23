import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SearchProfiles from '@/features/platform/search-profiles/SearchProfiles'
import SearchStartups from '@/features/platform/search-startups/SearchStartups'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/startups')({
  component: RouteComponent,
})

function RouteComponent() {
  const [tab, setTab] = useState('mentors')
  return (
    <div className="h-full flex flex-col p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Professional Network</h1>
          <p className="text-muted-foreground text-lg">
            Connect with mentors, investors, and creators to grow your startup
          </p>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 mb-4">
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
            <TabsTrigger value="creators">Creators/Collaborators</TabsTrigger>
            <TabsTrigger value="startups">Startups</TabsTrigger>
          </TabsList>
          <TabsContent value="mentors">
            <SearchProfiles userType="Mentor" />
          </TabsContent>
          <TabsContent value="investors">
            <SearchProfiles userType="Investor" />
          </TabsContent>
          <TabsContent value="creators">
            <SearchProfiles userType="Creator" />
          </TabsContent>
          <TabsContent value="startups">
            <SearchStartups />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
