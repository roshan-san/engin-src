import type { Profile } from "@/types/supa-types";
import { MapPin, Briefcase, Link as LinkIcon, Github, Linkedin } from "lucide-react";

export default function PublicProfileView({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
        <div className="flex items-start gap-6">
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.full_name}</h1>
            <p className="text-xl text-gray-600 mb-4">@{profile.username}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              {profile.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{profile.location}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-5 h-5 mr-1" />
                <span>{profile.work_type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {profile.user_type}
                </span>
              </div>
            </div>

            {profile.bio && (
              <p className="text-gray-700 mb-4">{profile.bio}</p>
            )}

            <div className="flex gap-4">
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills and Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.skills && profile.skills.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.interests && profile.interests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
