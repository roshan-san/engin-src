import { Input } from '@/components/ui/input';
import { useProfileSearch } from './useProfileSearch';
import ProfileCard from './ProfileCard';
import ReqDrawer from '../make-connections/ReqDrawer';

export default function SearchProfiles() {
  const {
    searchQuery,
    setSearchQuery,
    profiles,
    status,
    loadMore,
    ref,
  } = useProfileSearch();

  return (
    <div className="h-full flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for profiles..."
            value={searchQuery}
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 rounded-2xl"
          />
        </div>
        <ReqDrawer />
      </div>

      {status === 'LoadingFirstPage' ? (
        <div className="flex items-center justify-center h-32 text-gray-500">
          Loading...
        </div>
      ) : profiles && profiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
          <div
            ref={ref}
            className="col-span-full h-16 flex items-center justify-center text-gray-500"
          >
            {status === 'LoadingMore' ? (
              <div className="animate-pulse">Loading more...</div>
            ) : status === 'CanLoadMore' ? (
              <button
                onClick={() => loadMore(9)}
                className="cursor-pointer hover:text-blue-500 transition-colors"
              >
                Load more
              </button>
            ) : (
              <div>No more profiles to load</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 text-gray-500">
          No profiles found.
        </div>
      )}
    </div>
  );
}
