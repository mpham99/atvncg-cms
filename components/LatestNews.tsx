import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

// TODO: Fix mock data
async function getLatestNews() {
    // const res = await fetch('http://localhost:3000/api/news?where[status][equals]=published&limit=3&sort=-publishedDate');
    // const data = await res.json();
    // return data.docs;

    // Mock data
    return [
        {
            id: '1',
            title: 'Grand Finale Date Announced: December 25th at Mỹ Đình Stadium',
            slug: 'grand-finale-announcement',
            excerpt: 'The highly anticipated finale of Call Me By Fire Vietnam has been officially scheduled for December 25th at the iconic Mỹ Đình National Stadium.',
            category: 'announcements',
            publishedDate: new Date('2024-12-10T10:00:00'),
        },
        {
            id: '2',
            title: 'Behind the Scenes: How Artists Prepare for Live Performances',
            slug: 'behind-scenes-preparations',
            excerpt: 'Get an exclusive look at the intensive preparation process our artists undergo before each electrifying performance on the show.',
            category: 'behind-scenes',
            publishedDate: new Date('2024-12-08T14:30:00'),
        },
        {
            id: '3',
            title: 'Tuấn Hưng Breaks Voting Record with 250K Votes in 24 Hours',
            slug: 'tuan-hung-voting-record',
            excerpt: 'Artist Tuấn Hưng has made history by receiving an unprecedented 250,000 votes within a single day, setting a new show record.',
            category: 'artist-news',
            publishedDate: new Date('2024-12-06T09:15:00'),
        },
    ];
}

export default async function LatestNews() {
    const news = await getLatestNews();

    const categoryColors = {
        'announcements': 'bg-accent/10 text-accent',
        'artist-news': 'bg-primary/10 text-primary',
        'behind-scenes': 'bg-purple-100 text-purple-600',
        'show-updates': 'bg-blue-100 text-blue-600',
        'fan-stories': 'bg-green-100 text-green-600',
        'interviews': 'bg-yellow-100 text-yellow-600',
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
                <article key={article.id} className="card group">
                    {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20" />

                    <div className="p-6">
                        {/* Category */}
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[article.category as keyof typeof categoryColors] || 'bg-secondary text-text'}`}>
                            {article.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-text/70 mb-4 line-clamp-3">
                            {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between border-t border-secondary pt-3">
                            <div className="flex items-center space-x-2 text-xs text-text/70">
                                <Clock className="w-4 h-4" />
                                <time dateTime={article.publishedDate.toISOString()}>
                                    {format(new Date(article.publishedDate), 'MMM d, yyyy')}
                                </time>
                            </div>

                            <Link
                                href={`/news/${article.slug}`}
                                className="text-sm font-medium text-primary hover:text-accent transition-colors duration-300 flex items-center space-x-1 group/link"
                            >
                                <span>Read More</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}