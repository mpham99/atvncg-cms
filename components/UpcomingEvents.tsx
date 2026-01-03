import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

// TODO: Fix mock data
async function getUpcomingEvents() {
    // const res = await fetch('http://localhost:3000/api/events?where[status][equals]=upcoming&limit=3&sort=eventDate');
    // const data = await res.json();
    // return data.docs;

    // Mock data
    return [
        {
            id: '1',
            title: 'Call Me By Fire - Grand Finale Concert',
            slug: 'grand-finale-concert',
            eventDate: new Date('2024-12-25T19:00:00'),
            type: 'concert',
            location: {
                venue: 'Mỹ Đình National Stadium',
                city: 'Hanoi',
            },
            artists: [
                { name: 'Tuấn Hưng' },
                { name: 'Bằng Kiều' },
                { name: 'BB Trần' },
            ],
        },
        {
            id: '2',
            title: 'Fan Meeting with Team A Artists',
            slug: 'team-a-fan-meeting',
            eventDate: new Date('2024-12-20T15:00:00'),
            type: 'fan-meeting',
            location: {
                venue: 'Diamond Plaza',
                city: 'Ho Chi Minh City',
            },
            artists: [
                { name: 'Tuấn Hưng' },
                { name: 'S.T Sơn Thạch' },
            ],
        },
        {
            id: '3',
            title: 'Live TV Performance Special',
            slug: 'tv-performance-special',
            eventDate: new Date('2024-12-18T20:00:00'),
            type: 'tv-appearance',
            location: {
                venue: 'VTV Studio',
                city: 'Hanoi',
            },
            artists: [
                { name: 'All Artists' },
            ],
        },
    ];
}

export default async function UpcomingEvents() {
    const events = await getUpcomingEvents();

    const eventTypeColors = {
        concert: 'bg-accent/10 text-accent',
        'fan-meeting': 'bg-primary/10 text-primary',
        'tv-appearance': 'bg-purple-100 text-purple-600',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="card group"
                >
                    {/* Header */}
                    <div className="p-6 pb-4">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${eventTypeColors[event.type as keyof typeof eventTypeColors] || 'bg-secondary text-text'}`}>
                            {event.type.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>

                        <h3 className="text-xl font-bold text-text mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {event.title}
                        </h3>

                        {/* Date & Time */}
                        <div className="flex items-start space-x-2 text-text/70 mb-3">
                            <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-text">
                                    {format(new Date(event.eventDate), 'EEEE, MMMM d, yyyy')}
                                </div>
                                <div className="text-sm flex items-center space-x-1 mt-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{format(new Date(event.eventDate), 'h:mm a')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start space-x-2 text-text/70 mb-4">
                            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-text">{event.location.venue}</div>
                                <div className="text-sm">{event.location.city}</div>
                            </div>
                        </div>

                        {/* Artists */}
                        <div className="border-t border-secondary pt-3">
                            <div className="text-sm text-text/70 mb-2">Featuring:</div>
                            <div className="flex flex-wrap gap-2">
                                {event.artists.slice(0, 3).map((artist, idx) => (
                                    <span key={idx} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                    {artist.name}
                  </span>
                                ))}
                                {event.artists.length > 3 && (
                                    <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                    +{event.artists.length - 3} more
                  </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6">
                        <button className="w-full btn-secondary text-sm py-2">
                            View Details
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
}