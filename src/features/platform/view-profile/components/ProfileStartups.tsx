import type { Doc } from "@/../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ProfileStartups({
  profile,
}: {
  profile: Doc<"profiles">;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Startups</CardTitle>
        <CardDescription>
          Companies founded or co-founded by {profile.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>No startups to display yet.</p>
      </CardContent>
    </Card>
  );
}
