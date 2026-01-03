'use server'

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users } from 'lucide-react';
import { getPayload } from 'payload'
import config from '../payload-config'

async function getFeaturedArtists() {
    const payload = await getPayload({ config })

    const artists = await payload.find({
        collection: 'artists',
        where: {
            featured: {
                equals: true,
            },
        },
        depth: 1,
        limit: 6,
    })

    return artists.docs
}

export default async function FeaturedArtists() {
    const artists = await getFeaturedArtists();

    if (artists.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-text/70">No featured artists yet. Check back soon!</p>
            </div>
        )
    }

    const teamColorClasses: Record<string, string> = {
        red: 'bg-red-100 text-red-600 border-red-200',
        blue: 'bg-blue-100 text-blue-600 border-blue-200',
        green: 'bg-green-100 text-green-600 border-green-200',
        purple: 'bg-purple-100 text-purple-600 border-purple-200',
        orange: 'bg-orange-100 text-orange-600 border-orange-200',
        yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        pink: 'bg-pink-100 text-pink-600 border-pink-200',
        teal: 'bg-teal-100 text-teal-600 border-teal-200',
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => {
                const teams = Array.isArray(artist.teams)
                    ? artist.teams.map(team => typeof team === 'object' ? team : null).filter(Boolean)
                    : []

                return (
                    <Link
                        key={artist.id}
                        href={`/artists/${artist.slug}`}
                        className="card group"
                    >
                        {/* Image */}
                        <div className="relative h-64 bg-secondary overflow-hidden">
                            {artist.profileImage && typeof artist.profileImage === 'object' && artist.profileImage.url ? (
                                <Image
                                    src={artist.profileImage.url}
                                    alt={artist.profileImage.alt || artist.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                    <Users className="w-24 h-24 text-primary/30" />
                                </div>
                            )}

                            {/* Team Badges - Multiple Teams */}
                            {teams.length > 0 && (
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {teams.slice(0, 2).map((team: any) => (
                                        <div
                                            key={team.id}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${teamColorClasses[team.color] || 'bg-primary/10 text-primary border-primary/20'}`}
                                        >
                                            {team.name}
                                        </div>
                                    ))}
                                    {teams.length > 2 && (
                                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                            +{teams.length - 2}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                                {artist.name}
                            </h3>

                            {artist.stageName && artist.stageName !== artist.name && (
                                <p className="text-sm text-text/70 mb-3">Known as: {artist.stageName}</p>
                            )}

                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm text-text/70 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4 text-accent" />
                                    <span>{artist.stats?.totalVotes ? `${(artist.stats.totalVotes / 1000).toFixed(0)}K` : '0'} votes</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>{artist.stats?.followers ? `${(artist.stats.followers / 1000).toFixed(0)}K` : '0'} followers</span>
                                </div>
                            </div>

                            {/* Button */}
                            <button className="w-full btn-secondary text-sm py-2">
                                View Profile
                            </button>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}