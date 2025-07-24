import { Input } from "@/components/ui/input";
import { useProfileSearch } from "./useProfileSearch";
import ProfileCard from "./ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users, Filter } from "lucide-react";

// Add userType prop
interface SearchProfilesProps {
  userType?: string;
}

export default function SearchProfiles({ userType }: SearchProfilesProps) {
  const { searchQuery, setSearchQuery, profiles, status, loadMore, ref } =
    useProfileSearch();

  // Filter profiles by userType if provided
  const filteredProfiles = userType
    ? (profiles || []).filter((profile) => profile.user_type === userType)
    : profiles;

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder={`Search for ${userType?.toLowerCase() || 'profiles'}...`}
          value={searchQuery}
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border/50 focus:border-primary transition-all duration-200 bg-background/50 backdrop-blur-sm"
        />
      </div>

      {/* Results Header */}
      {filteredProfiles && filteredProfiles.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {filteredProfiles.length} {userType?.toLowerCase() || 'profile'}{filteredProfiles.length !== 1 ? 's' : ''} found
            </span>
          </div>
          {userType && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtered by: {userType}</span>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {status === "LoadingFirstPage" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredProfiles && filteredProfiles.length > 0 ? (
        <>
          {/* Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
          
          {/* Load More Section */}
          <div
            ref={ref}
            className="flex items-center justify-center py-8"
          >
            {status === "LoadingMore" ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                <span>Loading more...</span>
              </div>
            ) : status === "CanLoadMore" ? (
              <button
                onClick={() => loadMore(9)}
                className="px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-200 font-medium"
              >
                Load more profiles
              </button>
            ) : (
              <div className="text-center text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No more profiles to load</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Profiles Found</h3>
          <p className="text-muted-foreground max-w-md">
            {searchQuery 
              ? `No ${userType?.toLowerCase() || 'profiles'} found matching "${searchQuery}". Try adjusting your search terms.`
              : `No ${userType?.toLowerCase() || 'profiles'} available at the moment. Check back later!`
            }
          </p>
        </div>
      )}
    </div>
  );
}
