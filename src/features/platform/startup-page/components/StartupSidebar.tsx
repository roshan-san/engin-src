import { Card, CardContent } from "../../../../components/ui/card";
import { Globe, Mail, Phone } from "lucide-react";
import type { Doc } from "@/../convex/_generated/dataModel";

interface StartupSidebarProps {
  startup: Doc<"startups">;
}

export function StartupSidebar({ startup }: StartupSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Key Metrics Section */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Stage</span>
              <span className="text-sm font-medium">{startup.stage || "MVP"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Founded</span>
              <span className="text-sm font-medium">
                {startup.createdAt ? new Date(startup.createdAt).getFullYear() : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Team Size</span>
              <span className="text-sm font-medium">{startup.team_size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Funding</span>
              <span className="text-sm font-medium">${startup.funding?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Upvotes</span>
              <span className="text-sm font-medium text-green-600">{startup.upvotes?.length || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Section */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact</h3>
          <div className="space-y-4">
            {startup.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a 
                  href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {startup.website}
                </a>
              </div>
            )}
            {startup.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a 
                  href={`mailto:${startup.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {startup.email}
                </a>
              </div>
            )}
            {startup.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a 
                  href={`tel:${startup.phone}`}
                  className="text-sm text-primary hover:underline"
                >
                  {startup.phone}
                </a>
              </div>
            )}
            {!startup.website && !startup.email && !startup.phone && (
              <p className="text-sm text-muted-foreground">
                No contact information available.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 