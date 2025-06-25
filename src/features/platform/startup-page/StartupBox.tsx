import type { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "../../../components/ui/button";
import {
	MapPin,
	DollarSign,
	Users,
	AlertTriangle,
	Lightbulb,
	MessageCircle,
	Building2,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";

interface StartupBoxProps {
	startup: Doc<"startups">;
}

export function StartupBox({ startup }: StartupBoxProps) {
	const ownerProfile = useQuery(api.profile.queries.getProfileById, {
		profileId: startup.ownerId,
	});

	return (
		<div className="p-6 space-y-10 max-w-4xl mx-auto">
			{/* Startup Header */}
			<div className="flex flex-col md:flex-row gap-8">
				{/* Sidebar: Logo, Name, Founder */}
				<div className="md:w-1/3 w-full flex flex-col items-center gap-6">
					{/* Logo or Placeholder */}
					<div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-muted border shadow-sm mb-2">
						<Building2 className="w-12 h-12 text-primary/60" />
					</div>
					{/* Startup Name */}
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center w-full">
						{startup.name}
					</h1>
					{/* Founder Card */}
					{ownerProfile && (
						<div className="w-full">
							<Card className="items-center">
								<CardHeader className="flex flex-col items-center gap-2 border-none px-0 pb-0">
									<Avatar className="w-16 h-16 mb-2 shadow-md ring-2 ring-primary/30">
										<AvatarImage
											src={ownerProfile.avatar_url}
											alt={ownerProfile.username || ownerProfile.name || "Owner"}
										/>
										<AvatarFallback className="text-2xl font-bold text-primary bg-muted">
											{ownerProfile.username?.[0]?.toUpperCase() || '?'}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col items-center">
										<p className="font-bold text-lg sm:text-xl text-center truncate">
											{ownerProfile.username || ownerProfile.name || "Owner"}
										</p>
										<Badge className="mt-1" variant="default">Founder</Badge>
									</div>
								</CardHeader>
								<CardContent className="w-full flex flex-col items-center pt-0">
									{ownerProfile.username && (
										<Link
											to="/message/$username"
											params={{ username: ownerProfile.username }}
											className="w-full pt-2"
										>
											<Button
												size="sm"
												variant="outline"
												className="w-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors rounded-full shadow"
											>
												<MessageCircle className="h-4 w-4" />
												Message Founder
											</Button>
										</Link>
									)}
								</CardContent>
							</Card>
						</div>
					)}
				</div>
				{/* Main Content: Description */}
				<div className="md:w-2/3 w-full flex flex-col justify-center">
					<div className="bg-muted/40 border rounded-2xl p-6 shadow-sm">
						<h2 className="text-lg font-semibold mb-2 text-primary">About this Startup</h2>
						<p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
							{startup.description}
						</p>
					</div>
				</div>
			</div>

			{/* Problem & Solution */}
			<div className="space-y-8">
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Problem */}
					<div className="space-y-3 p-6 rounded-2xl border bg-amber-50/60 dark:bg-amber-900/10 shadow-sm hover:shadow-lg transition-all duration-300">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex-shrink-0">
								<AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
							</div>
							<h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-2">
								The Problem
							</h3>
						</div>
						<div className="pl-12">
							<p className="text-base text-muted-foreground leading-relaxed break-words">
								{startup.problem}
							</p>
						</div>
					</div>

					{/* Solution */}
					<div className="space-y-3 p-6 rounded-2xl border bg-green-50/60 dark:bg-green-900/10 shadow-sm hover:shadow-lg transition-all duration-300">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 flex-shrink-0">
								<Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
							</div>
							<h3 className="text-lg font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
								Our Solution
							</h3>
						</div>
						<div className="pl-12">
							<p className="text-base text-muted-foreground leading-relaxed break-words">
								{startup.solution}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Stats */}
			<div className="pt-8 border-t">
				<h3 className="text-lg font-semibold text-center lg:text-left pb-6 flex items-center gap-2 justify-center lg:justify-start">
					<span>Key Metrics</span>
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{/* Location */}
					<div className="group p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-2">
						<div className="flex items-center gap-2 pb-1">
							<MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							<span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Location</span>
						</div>
						<span className="inline-block px-3 py-1 rounded-full bg-blue-200/60 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 text-sm font-semibold">
							{startup.location}
						</span>
					</div>

					{/* Funding */}
					<div className="group p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-2">
						<div className="flex items-center gap-2 pb-1">
							<DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
							<span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Funding</span>
						</div>
						<span className="inline-block px-3 py-1 rounded-full bg-green-200/60 dark:bg-green-900/30 text-green-900 dark:text-green-100 text-sm font-semibold">
							${startup.funding.toLocaleString()}
						</span>
					</div>

					{/* Team Size */}
					<div className="group p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-2">
						<div className="flex items-center gap-2 pb-1">
							<Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
							<span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Team Size</span>
						</div>
						<span className="inline-block px-3 py-1 rounded-full bg-purple-200/60 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 text-sm font-semibold">
							{startup.team_size} members
						</span>
					</div>
				</div>
			</div>
		</div>
	);
} 