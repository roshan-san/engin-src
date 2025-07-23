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
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useUser } from "@/features/authentication/UserContext";

export default function StartupCard({ startup }: { startup: Doc<"startups"> & { upvotesCount?: number, upvotes?: string[] } }) {
  const { profile } = useUser();
  const toggleUpvote = useMutation(api.startups.mutations.toggleUpvoteStartup);
  const [upvotes, setUpvotes] = useState(startup.upvotesCount || 0);
  const [hasUpvoted, setHasUpvoted] = useState(
    Array.isArray(startup.upvotes) && profile ? startup.upvotes.includes(profile._id) : false
  );
  const [loading, setLoading] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await toggleUpvote({ startupId: startup._id });
      setUpvotes(res.upvotesCount);
      setHasUpvoted(res.upvoted);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={hasUpvoted ? "secondary" : "ghost"}
              onClick={handleUpvote}
              disabled={loading}
              aria-label="Upvote"
            >
              <ThumbsUp className="w-4 h-4" />
              {upvotes}
            </Button>
            <span className="text-xs text-muted-foreground">
              {new Date(startup._creationTime).toLocaleDateString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
