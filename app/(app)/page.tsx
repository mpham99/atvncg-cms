import Link from 'next/link';
import { Calendar, TrendingUp, Users, Sparkles, ArrowRight } from 'lucide-react';
import FeaturedArtists from '@/components/FeaturedArtists';
import UpcomingEvents from '@/components/UpcomingEvents';
import ActiveCampaigns from '@/components/ActiveCampaigns';
import LatestNews from '@/components/LatestNews';
import SectionDivider from '@/components/SectionDivider';
import { getPayload } from 'payload'
import config from '../../payload-config'

export const metadata = {
    title: 'Call Me By Fire - Fan Hub | Home',
    description: 'Your ultimate destination for Call Me By Fire Vietnam. Follow all 33 artists, vote in campaigns, and never miss an event.',
};

export const revalidate = 3600; // Revalidate every hour

async function getStats() {
    const payload = await getPayload({ config })

    const [artistsCount, campaignsCount, eventsCount] = await Promise.all([
        payload.count({ collection: 'artists' }),
        payload.count({ collection: 'campaigns', where: { active: { equals: true } } }),
        payload.count({ collection: 'events', where: { status: { equals: 'upcoming' } } }),
    ])

    // Get total votes from all artists
    const artists = await payload.find({
        collection: 'artists',
        limit: 1000,
    })

    const totalVotes = artists.docs.reduce((sum, artist) => {
        return sum + (artist.stats?.totalVotes || 0)
    }, 0)

    return {
        artistsCount: artistsCount.totalDocs,
        campaignsCount: campaignsCount.totalDocs,
        eventsCount: eventsCount.totalDocs,
        totalVotes,
    }
}

export default async function Home() {
    const stats = await getStats()

    const statsDisplay = [
        { label: 'Artists', value: stats.artistsCount.toString(), icon: Users },
        { label: 'Active Campaigns', value: stats.campaignsCount.toString(), icon: TrendingUp },
        { label: 'Upcoming Events', value: stats.eventsCount.toString(), icon: Calendar },
        {
            label: 'Total Votes',
            value: stats.totalVotes > 1000000
                ? `${(stats.totalVotes / 1000000).toFixed(1)}M+`
                : `${(stats.totalVotes / 1000).toFixed(0)}K+`,
            icon: Sparkles
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-secondary to-accent/10 py-20 md:py-32">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
                            Welcome to the <span className="text-primary">Call Me By Fire</span> Fan Hub
                        </h1>
                        <p className="text-lg md:text-xl text-text/80 mb-8 leading-relaxed">
                            Your ultimate destination to follow all {stats.artistsCount} incredible artists, vote in campaigns,
                            track events, and stay connected with the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/artists" className="btn-primary inline-flex items-center justify-center group">
                                Explore Artists
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link href="/campaigns" className="btn-secondary inline-flex items-center justify-center">
                                View Campaigns
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
                        {statsDisplay.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-text mb-1">{stat.value}</div>
                                    <div className="text-sm text-text/70">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Featured Artists Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Featured Artists</h2>
                        <p className="text-text/70 max-w-2xl mx-auto">
                            Meet the talented artists who are setting the stage on fire
                        </p>
                    </div>
                    <FeaturedArtists />
                    <div className="text-center mt-8">
                        <Link href="/artists" className="btn-secondary inline-flex items-center group">
                            View All Artists
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Active Campaigns Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Active Campaigns</h2>
                        <p className="text-text/70 max-w-2xl mx-auto">
                            Support your favorite artists and help them reach their goals
                        </p>
                    </div>
                    <ActiveCampaigns />
                </div>
            </section>

            <SectionDivider />

            {/* Upcoming Events Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Upcoming Events</h2>
                        <p className="text-text/70 max-w-2xl mx-auto">
                            Don't miss out on concerts, fan meetings, and special appearances
                        </p>
                    </div>
                    <UpcomingEvents />
                    <div className="text-center mt-8">
                        <Link href="/events" className="btn-secondary inline-flex items-center group">
                            See All Events
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Latest News Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Latest News</h2>
                        <p className="text-text/70 max-w-2xl mx-auto">
                            Stay updated with the latest happenings from the show
                        </p>
                    </div>
                    <LatestNews />
                    <div className="text-center mt-8">
                        <Link href="/news" className="btn-secondary inline-flex items-center group">
                            Read More News
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}