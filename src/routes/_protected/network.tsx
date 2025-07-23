import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SearchProfiles from '@/features/platform/search-profiles/SearchProfiles'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/network')({
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
          <TabsList className="grid w-full grid-cols-3 h-12 mb-4">
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
            <TabsTrigger value="creators">Creators/Collaborators</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  )
}
