import type { Doc } from "../../../../convex/_generated/dataModel.d.ts";
import { Button } from "../../../components/ui/button";
import {
	MapPin,
	DollarSign,
	Users,
	AlertTriangle,
	Lightbulb,
	MessageCircle,
	Building2,
	Edit
} from "lucide-react";
import { useQuery, } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, } from "../../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar";
import { StartupEditDrawer } from "./StartupEditDrawer";

interface StartupBoxProps {
	startup: Doc<"startups">;
	isOwner: boolean;
}

export function StartupBox({ startup, isOwner }: StartupBoxProps) {
	const ownerProfile = useQuery(api.profile.queries.getProfileById, {
		profileId: startup.ownerId,
	});

	return (
		<Card className="md:p-6 shadow-xl border-none bg-background/95 relative">
			<CardContent className="p-0 md:p-0">
				{/* Header: Logo, Name, Founder (right) */}
				<div className="flex flex-col md:flex-row gap-8 md:gap-10 p-6 pb-0 items-center md:items-start">
					{/* Logo and Name */}
					<div className="flex flex-col items-center md:items-start flex-1 gap-2">
						<div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-muted border shadow-sm mb-1">
							<Building2 className="w-10 h-10 text-primary/60" />
						</div>
						<div className="flex items-center gap-2 w-full">
							<h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-center md:text-left w-full">
								{startup.name}
							</h1>
						</div>
					</div>
					{/* Founder (right) */}
					{ownerProfile && (
						<div className="flex flex-col items-center md:items-end min-w-[120px]">
							<Avatar className="w-8 h-8 mb-1">
								<AvatarImage
									src={ownerProfile.avatar_url}
									alt={ownerProfile.username || ownerProfile.name || "Owner"}
								/>
								<AvatarFallback className="text-base font-semibold text-primary bg-muted">
									{ownerProfile.username?.[0]?.toUpperCase() || '?'}
								</AvatarFallback>
							</Avatar>
							<p className="text-sm text-muted-foreground text-center md:text-right truncate max-w-[100px]">
								{ownerProfile.username || ownerProfile.name || "Owner"}
							</p>
							{ownerProfile.username && (
								<Link
									to="/message/$username"
									params={{ username: ownerProfile.username }}
									className="w-full pt-2"
								>
									<Button
										size="sm"
										variant="outline"
										className="w-full gap-2 rounded-full"
									>
										<MessageCircle className="h-4 w-4" />
										Message Founder
									</Button>
								</Link>
							)}
						</div>
					)}
				</div>

				{/* Problem & Solution (move up) */}
				<div className="space-y-8 px-6 pt-2">
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

	
				<div className="pt-8">
					<h3 className="text-lg font-semibold text-center lg:text-left pb-6 flex items-center gap-2 justify-center lg:justify-start">
						<span>Key Metrics</span>
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
			</CardContent>
			{isOwner && (
				<div className="fixed bottom-15 right-5 z-50">
					<StartupEditDrawer
						startup={startup}
						renderTrigger={({ open, setOpen }) => (
							<button
								onClick={() => setOpen(!open)}
								className="group shadow-lg transition-all duration-200 w-14 h-14 rounded-full p-0 bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 flex items-center justify-center overflow-hidden sm:w-14 sm:hover:w-40 sm:pr-6"
								aria-label="Edit startup"
							>
								<Edit className="h-6 w-6 m-auto sm:mr-2 sm:h-5 sm:w-5 transition-all duration-200" />
								<span className="hidden sm:inline-block whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-200 text-base font-semibold">
									Edit Startup
								</span>
							</button>
						)}
					/>
				</div>
			)}
		</Card>
	);
} 