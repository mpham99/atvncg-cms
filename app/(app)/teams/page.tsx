import Link from 'next/link';
import Image from 'next/image';
import { Users, Trophy, TrendingUp, Hash } from 'lucide-react';
import { getPayload } from 'payload'
import config from '../../../payload-config'
import SectionDivider from '@/components/SectionDivider';

export const metadata = {
    title: 'Teams - Call Me By Fire Fan Hub',
    description: 'Explore all competing teams in Call Me By Fire Vietnam. View team stats, members, and achievements.',
};

export const revalidate = 3600;

async function getAllTeams() {
    const payload = await getPayload({ config })

    const teams = await payload.find({
        collection: 'teams',
        where: {
            active: { equals: true }
        },
        depth: 2, // Include captain and their data
        limit: 100,
    })

    // Get member count for each team
    const teamsWithMembers = await Promise.all(
        teams.docs.map(async (team) => {
            const members = await payload.find({
                collection: 'artists',
                where: {
                    teams: { contains: team.id }
                },
                limit: 1000,
            })

            return {
                ...team,
                memberCount: members.totalDocs,
            }
        })
    )

    return teamsWithMembers
}

export default async function TeamsPage() {
    const teams = await getAllTeams()

    const teamColorClasses: Record<string, string> = {
        red: 'from-red-500 to-red-600 border-red-200',
        blue: 'from-blue-500 to-blue-600 border-blue-200',
        green: 'from-green-500 to-green-600 border-green-200',
        purple: 'from-purple-500 to-purple-600 border-purple-200',
        orange: 'from-orange-500 to-orange-600 border-orange-200',
        yellow: 'from-yellow-500 to-yellow-600 border-yellow-200',
        pink: 'from-pink-500 to-pink-600 border-pink-200',
        teal: 'from-teal-500 to-teal-600 border-teal-200',
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        Competing <span className="text-primary">Teams</span>
                    </h1>
                    <p className="text-lg text-text/70 max-w-2xl mx-auto">
                        Explore all teams competing in Call Me By Fire. Each team brings unique talent and fierce determination to win.
                    </p>
                </div>

                <SectionDivider />

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teams.map((team) => {
                        const captain = typeof team.captain === 'object' ? team.captain : null

                        return (
                            <Link
                                key={team.id}
                                href={`/teams/${team.slug}`}
                                className="card group"
                            >
                                {/* Header with Team Color */}
                                <div className={`h-32 bg-gradient-to-br ${teamColorClasses[team.color] || 'from-primary to-accent'} relative overflow-hidden`}>
                                    {team.logo && typeof team.logo === 'object' && team.logo.url ? (
                                        <Image
                                            src={team.logo.url}
                                            alt={team.logo.alt || team.name}
                                            fill
                                            className="object-contain p-6"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Users className="w-16 h-16 text-white/50" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                                        {team.name}
                                    </h2>

                                    {team.motto && (
                                        <p className="text-sm italic text-text/70 mb-4 border-l-2 border-primary pl-3">
                                            "{team.motto}"
                                        </p>
                                    )}

                                    {team.description && (
                                        <p className="text-sm text-text/80 mb-4 line-clamp-2">
                                            {team.description}
                                        </p>
                                    )}

                                    {/* Captain */}
                                    {captain && (
                                        <div className="mb-4 pb-4 border-b border-secondary">
                                            <div className="text-xs text-text/70 mb-1">Team Captain</div>
                                            <div className="font-medium text-primary">{captain.name}</div>
                                        </div>
                                    )}

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className="text-center p-3 bg-secondary rounded-lg">
                                            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                                            <div className="text-lg font-bold text-text">{team.memberCount || 0}</div>
                                            <div className="text-xs text-text/70">Members</div>
                                        </div>
                                        <div className="text-center p-3 bg-secondary rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                                            <div className="text-lg font-bold text-text">
                                                {team.stats?.totalVotes ? `${(team.stats.totalVotes / 1000).toFixed(0)}K` : '0'}
                                            </div>
                                            <div className="text-xs text-text/70">Votes</div>
                                        </div>
                                        <div className="text-center p-3 bg-secondary rounded-lg">
                                            <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                                            <div className="text-lg font-bold text-text">{team.stats?.wins || 0}</div>
                                            <div className="text-xs text-text/70">Wins</div>
                                        </div>
                                    </div>

                                    {/* Hashtags */}
                                    {team.hashtags && team.hashtags.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex items-center space-x-1 text-xs text-text/70 mb-2">
                                                <Hash className="w-3 h-3" />
                                                <span>Team Hashtags</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {team.hashtags.slice(0, 2).map((hashtag: any, idx: number) => (
                                                    <span key={idx} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                            #{hashtag.tag}
                          </span>
                                                ))}
                                                {team.hashtags.length > 2 && (
                                                    <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                            +{team.hashtags.length - 2}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <button className="w-full btn-secondary text-sm py-2">
                                        View Team Details
                                    </button>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* No Teams Message */}
                {teams.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-text/30 mx-auto mb-4" />
                        <p className="text-text/70">No teams have been created yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}