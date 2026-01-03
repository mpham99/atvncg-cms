import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Calendar, Instagram, Facebook, Youtube, Twitter, ArrowLeft, TrendingUp, Hash, Crown, Award, Video } from 'lucide-react';
import SectionDivider from '@/components/SectionDivider';
import { getPayload } from 'payload'
import config from '../../../../payload-config'

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const payload = await getPayload({ config })
    const artists = await payload.find({
        collection: 'artists',
        where: { slug: { equals: params.slug } },
    })

    const artist = artists.docs[0]

    if (!artist) {
        return { title: 'Artist Not Found' }
    }

    return {
        title: `${artist.name} - Call Me By Fire Fan Hub`,
        description: `View ${artist.name}'s profile, stats, events, and campaigns. Support your favorite artist in Call Me By Fire Vietnam.`,
    }
}

async function getArtist(slug: string) {
    const payload = await getPayload({ config })
    const artists = await payload.find({
        collection: 'artists',
        where: { slug: { equals: slug } },
        depth: 2,
    })

    return artists.docs[0]
}

async function getArtistEvents(artistId: number | string) {
    const payload = await getPayload({ config })
    const events = await payload.find({
        collection: 'events',
        where: {
            artists: { contains: artistId },
            status: { equals: 'upcoming' }
        },
        limit: 5,
        sort: 'eventDate',
    })

    return events.docs
}

async function getArtistCampaigns(artistId: number | string) {
    const payload = await getPayload({ config })
    const campaigns = await payload.find({
        collection: 'campaigns',
        where: {
            artists: { contains: artistId },
            active: { equals: true }
        },
        limit: 5,
    })

    return campaigns.docs
}

export default async function ArtistDetailPage({ params }: { params: { slug: string } }) {
    const artist = await getArtist(params.slug)

    if (!artist) {
        notFound()
    }

    const events = await getArtistEvents(artist.id)
    const campaigns = await getArtistCampaigns(artist.id)

    const teams = Array.isArray(artist.teams)
        ? artist.teams.map((team: any) => typeof team === 'object' ? team : null).filter(Boolean)
        : []

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

    const socialIcons: any = {
        facebook: Facebook,
        instagram: Instagram,
        youtube: Youtube,
        twitter: Twitter,
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Back Button */}
                <Link href="/artists" className="inline-flex items-center text-primary hover:text-accent transition-colors duration-300 mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to All Artists
                </Link>

                {/* Hero Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* Profile Image */}
                        <div className="lg:col-span-1 relative h-96 lg:h-auto">
                            {artist.profileImage && typeof artist.profileImage === 'object' && artist.profileImage.url ? (
                                <Image
                                    src={artist.profileImage.url}
                                    alt={artist.profileImage.alt || artist.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center h-full">
                                    <Users className="w-32 h-32 text-primary/30" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="lg:col-span-2 p-8 lg:p-12">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    {/* Team Badges */}
                                    {teams.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {teams.map((team: any) => (
                                                <Link
                                                    key={team.id}
                                                    href={`/teams/${team.slug}`}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium border hover:scale-105 transition-transform duration-300 ${teamColorClasses[team.color] || 'bg-primary/10 text-primary border-primary/20'}`}
                                                >
                                                    {team.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-4xl md:text-5xl font-bold text-text">
                                            {artist.name}
                                        </h1>
                                        {artist.isTeamCaptain && (
                                            <div className="bg-yellow-500 text-white p-2 rounded-full" title="Team Captain">
                                                <Crown className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>

                                    {artist.stageName && artist.stageName !== artist.name && (
                                        <p className="text-xl text-text/70 mb-2">Known as: {artist.stageName}</p>
                                    )}

                                    {/* Profession Tags */}
                                    {artist.profession && Array.isArray(artist.profession) && artist.profession.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {artist.profession.map((prof: string, idx: number) => (
                                                <span key={idx} className="text-sm bg-secondary text-text/70 px-3 py-1 rounded-full">
                          {prof}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <Heart className="w-6 h-6 text-accent mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-text">{artist.stats?.totalVotes ? `${(artist.stats.totalVotes / 1000).toFixed(0)}K` : '0'}</div>
                                    <div className="text-sm text-text/70">Votes</div>
                                </div>
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-text">{artist.stats?.followers ? `${(artist.stats.followers / 1000).toFixed(0)}K` : '0'}</div>
                                    <div className="text-sm text-text/70">Followers</div>
                                </div>
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <Hash className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-text">{artist.stats?.hashtagMentions ? `${(artist.stats.hashtagMentions / 1000).toFixed(0)}K` : '0'}</div>
                                    <div className="text-sm text-text/70">Mentions</div>
                                </div>
                                <div className="text-center p-4 bg-secondary rounded-lg">
                                    <Video className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-text">{artist.stats?.performanceCount || 0}</div>
                                    <div className="text-sm text-text/70">Performances</div>
                                </div>
                            </div>

                            {/* Ranking */}
                            {artist.stats?.ranking && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Award className="w-5 h-5 text-yellow-600" />
                                        <span className="text-yellow-600 font-medium">Current Ranking: #{artist.stats.ranking}</span>
                                    </div>
                                </div>
                            )}

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {Object.entries(artist.socialMedia || {}).map(([platform, value]) => {
                                    if (!value) return null
                                    const Icon = socialIcons[platform]
                                    return (
                                        <a
                                            key={platform}
                                            href={typeof value === 'string' && value.startsWith('http') ? value : `https://${platform}.com/${value}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                                            aria-label={`Follow on ${platform}`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm font-medium capitalize">{platform}</span>
                                        </a>
                                    )
                                })}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button className="btn-accent flex items-center">
                                    <Heart className="w-5 h-5 mr-2" />
                                    Vote Now
                                </button>
                                <button className="btn-secondary">
                                    Support Campaign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <SectionDivider />

                {/* Biography Section */}
                {artist.bio && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
                                <TrendingUp className="w-6 h-6 text-primary mr-2" />
                                About {artist.name}
                            </h2>
                            <div className="prose prose-lg max-w-none text-text/80 leading-relaxed">
                                {typeof artist.bio === 'string' ? (
                                    <p>{artist.bio}</p>
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: JSON.stringify(artist.bio) }} />
                                )}
                            </div>
                        </div>
                        <SectionDivider />
                    </>
                )}

                {/* Achievements */}
                {artist.achievements && artist.achievements.length > 0 && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                <Award className="w-6 h-6 text-primary mr-2" />
                                Notable Achievements
                            </h2>
                            <div className="space-y-4">
                                {artist.achievements.map((achievement: any, idx: number) => (
                                    <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                                        <div className="flex items-start justify-between">
                                            <h3 className="font-bold text-text">{achievement.title}</h3>
                                            {achievement.year && (
                                                <span className="text-sm text-text/70 bg-secondary px-3 py-1 rounded-full">
                          {achievement.year}
                        </span>
                                            )}
                                        </div>
                                        {achievement.description && (
                                            <p className="text-text/70 text-sm mt-1">{achievement.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SectionDivider />
                    </>
                )}

                {/* Performance Videos */}
                {artist.videos && artist.videos.length > 0 && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                <Video className="w-6 h-6 text-primary mr-2" />
                                Performance Videos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {artist.videos.map((video: any, idx: number) => (
                                    <a
                                        key={idx}
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group"
                                    >
                                        <div className="aspect-video rounded-lg overflow-hidden bg-secondary mb-3 relative">
                                            {video.thumbnail && typeof video.thumbnail === 'object' && video.thumbnail.url ? (
                                                <Image
                                                    src={video.thumbnail.url}
                                                    alt={video.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Video className="w-12 h-12 text-primary/30" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Video className="w-12 h-12 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-text group-hover:text-primary transition-colors duration-300">
                                            {video.title}
                                        </h3>
                                        {video.description && (
                                            <p className="text-sm text-text/70 mt-1 line-clamp-2">{video.description}</p>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <SectionDivider />
                    </>
                )}

                {/* Official Hashtags */}
                {artist.hashtags && artist.hashtags.length > 0 && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
                                <Hash className="w-6 h-6 text-primary mr-2" />
                                Official Hashtags
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {artist.hashtags.map((hashtag: any, idx: number) => (
                                    <div key={idx} className="bg-secondary text-primary px-4 py-2 rounded-lg font-medium">
                                        #{hashtag.tag}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-text/70 mt-4">
                                Use these hashtags on social media to show your support!
                            </p>
                        </div>
                        <SectionDivider />
                    </>
                )}

                {/* Upcoming Events */}
                {events.length > 0 && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                <Calendar className="w-6 h-6 text-primary mr-2" />
                                Upcoming Events
                            </h2>
                            <div className="space-y-4">
                                {events.map((event: any) => (
                                    <Link
                                        key={event.id}
                                        href={`/events/${event.slug}`}
                                        className="block p-4 border border-secondary rounded-lg hover:border-primary hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-text mb-1">{event.title}</h3>
                                                <p className="text-sm text-text/70">
                                                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium capitalize">
                                                {event.type}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <SectionDivider />
                    </>
                )}

                {/* Active Campaigns */}
                {campaigns.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                            <TrendingUp className="w-6 h-6 text-primary mr-2" />
                            Active Campaigns
                        </h2>
                        <div className="space-y-4">
                            {campaigns.map((campaign: any) => (
                                <Link
                                    key={campaign.id}
                                    href={`/campaigns/${campaign.slug}`}
                                    className="block p-4 border border-secondary rounded-lg hover:border-primary hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-text mb-1">{campaign.title}</h3>
                                            <p className="text-sm text-text/70">Support {artist.name} in this campaign</p>
                                        </div>
                                        <button className="btn-accent text-sm px-4 py-2">
                                            Participate
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}