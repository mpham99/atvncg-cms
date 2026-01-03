import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users, Trophy, TrendingUp, Hash, Instagram, Facebook, Twitter, Youtube, Crown } from 'lucide-react';
import { getPayload } from 'payload'
import config from '../../../../payload-config'
import SectionDivider from '@/components/SectionDivider';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const payload = await getPayload({ config })
    const teams = await payload.find({
        collection: 'teams',
        where: { slug: { equals: params.slug } },
    })

    const team = teams.docs[0]

    if (!team) {
        return { title: 'Team Not Found' }
    }

    return {
        title: `${team.name} - Call Me By Fire Fan Hub`,
        description: team.description || `View ${team.name}'s profile, members, stats, and latest updates.`,
    }
}

async function getTeam(slug: string) {
    const payload = await getPayload({ config })
    const teams = await payload.find({
        collection: 'teams',
        where: { slug: { equals: slug } },
        depth: 2,
    })

    return teams.docs[0]
}

async function getTeamMembers(teamId: number | string) {
    const payload = await getPayload({ config })
    const members = await payload.find({
        collection: 'artists',
        where: {
            teams: { contains: teamId }
        },
        depth: 1,
        limit: 100,
    })

    return members.docs
}

export default async function TeamDetailPage({ params }: { params: { slug: string } }) {
    const team = await getTeam(params.slug)

    if (!team) {
        notFound()
    }

    const members = await getTeamMembers(team.id)
    const captain = typeof team.captain === 'object' ? team.captain : null

    const teamColorClasses: Record<string, string> = {
        red: 'from-red-500 to-red-600',
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600',
        yellow: 'from-yellow-500 to-yellow-600',
        pink: 'from-pink-500 to-pink-600',
        teal: 'from-teal-500 to-teal-600',
    }

    const socialIcons: any = {
        facebook: Facebook,
        instagram: Instagram,
        twitter: Twitter,
        youtube: Youtube,
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Back Button */}
                <Link href="/teams" className="inline-flex items-center text-primary hover:text-accent transition-colors duration-300 mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to All Teams
                </Link>

                {/* Hero Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className={`h-64 bg-gradient-to-br ${teamColorClasses[team.color] || 'from-primary to-accent'} relative`}>
                        {team.coverImage && typeof team.coverImage === 'object' && team.coverImage.url ? (
                            <Image
                                src={team.coverImage.url}
                                alt={team.coverImage.alt || team.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Users className="w-32 h-32 text-white/30" />
                            </div>
                        )}

                        {/* Logo Overlay */}
                        {team.logo && typeof team.logo === 'object' && team.logo.url && (
                            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-xl p-3 shadow-lg">
                                <Image
                                    src={team.logo.url}
                                    alt={team.logo.alt || team.name}
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-text mb-2">{team.name}</h1>

                        {team.motto && (
                            <p className="text-xl italic text-primary mb-4 border-l-4 border-primary pl-4">
                                "{team.motto}"
                            </p>
                        )}

                        {team.description && (
                            <p className="text-text/80 mb-6 leading-relaxed">{team.description}</p>
                        )}

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="text-center p-4 bg-secondary rounded-lg">
                                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold text-text">{members.length}</div>
                                <div className="text-sm text-text/70">Members</div>
                            </div>
                            <div className="text-center p-4 bg-secondary rounded-lg">
                                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold text-text">
                                    {team.stats?.totalVotes ? `${(team.stats.totalVotes / 1000).toFixed(0)}K` : '0'}
                                </div>
                                <div className="text-sm text-text/70">Total Votes</div>
                            </div>
                            <div className="text-center p-4 bg-secondary rounded-lg">
                                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold text-text">{team.stats?.wins || 0}</div>
                                <div className="text-sm text-text/70">Wins</div>
                            </div>
                            <div className="text-center p-4 bg-secondary rounded-lg">
                                <Hash className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold text-text">{team.stats?.performances || 0}</div>
                                <div className="text-sm text-text/70">Performances</div>
                            </div>
                        </div>

                        {/* Social Links */}
                        {team.socialMedia && Object.values(team.socialMedia).some(v => v) && (
                            <div className="flex flex-wrap gap-3">
                                {Object.entries(team.socialMedia).map(([platform, value]) => {
                                    if (!value) return null
                                    const Icon = socialIcons[platform]
                                    return (
                                        <a
                                            key={platform}
                                            href={typeof value === 'string' && value.startsWith('http') ? value : `https://${platform}.com/${value}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300"
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm font-medium capitalize">{platform}</span>
                                        </a>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <SectionDivider />

                {/* Team Captain */}
                {captain && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                <Crown className="w-6 h-6 text-primary mr-2" />
                                Team Captain {team.coach && `& Coach`}
                            </h2>
                            <div className="flex items-start space-x-6">
                                <Link href={`/artists/${captain.slug}`} className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-secondary">
                                        {captain.profileImage && typeof captain.profileImage === 'object' && captain.profileImage.url ? (
                                            <Image
                                                src={captain.profileImage.url}
                                                alt={captain.name}
                                                width={128}
                                                height={128}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Users className="w-16 h-16 text-primary/30" />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-primary mb-2">{captain.name}</h3>
                                    <p className="text-text/70 text-sm mb-3">Leading {team.name} to victory</p>
                                    {team.coach && (
                                        <div className="text-sm text-text/80">
                                            <span className="font-medium">Coach/Mentor:</span> {team.coach}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <SectionDivider />
                    </>
                )}

                {/* Team Members */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                        <Users className="w-6 h-6 text-primary mr-2" />
                        Team Members ({members.length})
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {members.map((member) => (
                            <Link
                                key={member.id}
                                href={`/artists/${member.slug}`}
                                className="group"
                            >
                                <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-3 relative">
                                    {member.profileImage && typeof member.profileImage === 'object' && member.profileImage.url ? (
                                        <Image
                                            src={member.profileImage.url}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Users className="w-12 h-12 text-primary/30" />
                                        </div>
                                    )}
                                    {member.isTeamCaptain && (
                                        <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1.5 rounded-full">
                                            <Crown className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-text group-hover:text-primary transition-colors duration-300 text-center">
                                    {member.name}
                                </h3>
                                {member.stageName && member.stageName !== member.name && (
                                    <p className="text-sm text-text/70 text-center">{member.stageName}</p>
                                )}
                            </Link>
                        ))}
                    </div>

                    {members.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-text/70">No team members yet.</p>
                        </div>
                    )}
                </div>

                {/* Team Hashtags */}
                {team.hashtags && team.hashtags.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
                            <Hash className="w-6 h-6 text-primary mr-2" />
                            Team Hashtags
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {team.hashtags.map((hashtag: any, idx: number) => (
                                <div key={idx} className="bg-secondary text-primary px-4 py-2 rounded-lg font-medium">
                                    #{hashtag.tag}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-text/70 mt-4">
                            Use these hashtags to show your support for {team.name}!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}