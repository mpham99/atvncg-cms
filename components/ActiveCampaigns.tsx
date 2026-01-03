import Link from 'next/link';
import { TrendingUp, Target, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

//TODO: Fix mock data
async function getActiveCampaigns() {
    // const res = await fetch('http://localhost:3000/api/campaigns?where[active][equals]=true&limit=3');
    // const data = await res.json();
    // return data.docs;

    // Mock data
    return [
        {
            id: '1',
            title: 'Vote for Your Favorite Artist - Final Round',
            slug: 'final-voting-round',
            type: 'voting',
            endDate: new Date('2024-12-31T23:59:59'),
            goals: [
                {
                    description: 'Total Votes',
                    target: 5000000,
                    current: 3750000,
                    unit: 'votes',
                }
            ],
            artists: [
                { name: 'All Artists' }
            ]
        },
        {
            id: '2',
            title: '#CallMeByFireChallenge on TikTok',
            slug: 'tiktok-challenge',
            type: 'hashtag',
            endDate: new Date('2024-12-28T23:59:59'),
            goals: [
                {
                    description: 'TikTok Posts',
                    target: 100000,
                    current: 67500,
                    unit: 'posts',
                }
            ],
            artists: [
                { name: 'Tuấn Hưng' },
                { name: 'BB Trần' }
            ]
        },
        {
            id: '3',
            title: 'Charity Concert Fundraiser',
            slug: 'charity-fundraiser',
            type: 'charity',
            endDate: new Date('2024-12-25T23:59:59'),
            goals: [
                {
                    description: 'Funds Raised',
                    target: 1000000000,
                    current: 850000000,
                    unit: 'VND',
                }
            ],
            artists: [
                { name: 'Bằng Kiều' },
                { name: 'S.T Sơn Thạch' }
            ]
        },
    ];
}

export default async function ActiveCampaigns() {
    const campaigns = await getActiveCampaigns();

    const campaignTypeColors = {
        voting: 'bg-accent/10 text-accent border-accent/20',
        hashtag: 'bg-primary/10 text-primary border-primary/20',
        charity: 'bg-green-100 text-green-600 border-green-200',
        streaming: 'bg-purple-100 text-purple-600 border-purple-200',
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
                const goal = campaign.goals[0];
                const progress = (goal.current / goal.target) * 100;

                return (
                    <div key={campaign.id} className="card group">
                        <div className="p-6">
                            {/* Type Badge */}
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 border ${campaignTypeColors[campaign.type as keyof typeof campaignTypeColors] || 'bg-secondary text-text border-secondary'}`}>
                                {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                {campaign.title}
                            </h3>

                            {/* Time Remaining */}
                            <div className="flex items-center space-x-2 text-sm text-text/70 mb-4">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>Ends {format(new Date(campaign.endDate), 'MMM d, yyyy')}</span>
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text/70 flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.description}</span>
                  </span>
                                    <span className="font-medium text-primary">{progress.toFixed(0)}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-xs text-text/70 mt-1">
                                    <span>{formatNumber(goal.current)} {goal.unit}</span>
                                    <span>Goal: {formatNumber(goal.target)} {goal.unit}</span>
                                </div>
                            </div>

                            {/* Artists */}
                            <div className="border-t border-secondary pt-3 mb-4">
                                <div className="text-sm text-text/70 mb-2">Supporting:</div>
                                <div className="flex flex-wrap gap-2">
                                    {campaign.artists.slice(0, 2).map((artist, idx) => (
                                        <span key={idx} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                      {artist.name}
                    </span>
                                    ))}
                                    {campaign.artists.length > 2 && (
                                        <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                      +{campaign.artists.length - 2} more
                    </span>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                href={`/campaigns/${campaign.slug}`}
                                className="btn-accent w-full flex items-center justify-center group/btn"
                            >
                                Participate Now
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}