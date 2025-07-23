import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, DollarSign, MapPin, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Doc } from "@/../convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";

export default function StartupCard({ startup }: { startup: Doc<"startups"> }) {
  return (
    <Link
      key={startup._id}
      to={"/startups/$startupid"}
      params={{ startupid: startup._id }}
      className="block hover:no-underline"
    >
      <Card className="w-full h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {startup.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{startup.location}</span>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{startup.team_size}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {startup.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold">
              ${(startup.funding / 1000000).toFixed(1)}M
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(startup._creationTime).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
