'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Search, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ArtistsPage() {
    const [artists, setArtists] = useState<any[]>([]);
    const [allTeams, setAllTeams] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch artists and teams
    useEffect(() => {
        async function fetchData() {
            try {
                const [artistsRes, teamsRes] = await Promise.all([
                    fetch('/api/artists?limit=100&depth=1'),
                    fetch('/api/teams?limit=100')
                ]);

                const artistsData = await artistsRes.json();
                const teamsData = await teamsRes.json();

                setArtists(artistsData.docs || []);
                setAllTeams(teamsData.docs || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Filter artists
    const filteredArtists = artists.filter(artist => {
        // Search filter
        const matchesSearch = !searchQuery ||
            artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artist.stageName?.toLowerCase().includes(searchQuery.toLowerCase());

        // Team filter
        const matchesTeam = !selectedTeam ||
            (Array.isArray(artist.teams) &&
                artist.teams.some((team: any) =>
                    (typeof team === 'object' ? team.id : team) === selectedTeam
                ));

        // Status filter
        const matchesStatus = !selectedStatus || artist.status === selectedStatus;

        return matchesSearch && matchesTeam && matchesStatus;
    });

    const teamColorClasses: Record<string, string> = {
        red: 'bg-red-100 text-red-600 border-red-200',
        blue: 'bg-blue-100 text-blue-600 border-blue-200',
        green: 'bg-green-100 text-green-600 border-green-200',
        purple: 'bg-purple-100 text-purple-600 border-purple-200',
        orange: 'bg-orange-100 text-orange-600 border-orange-200',
        yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        pink: 'bg-pink-100 text-pink-600 border-pink-200',
        teal: 'bg-teal-100 text-teal-600 border-teal-200',
    };

    if (loading) {
        return (
            <div className="py-16">
                <div className="container-custom">
                    <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-text/70">Loading artists...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        Meet the <span className="text-primary">Artists</span>
                    </h1>
                    <p className="text-lg text-text/70 max-w-2xl mx-auto">
                        Discover all {artists.length} talented artists competing to reignite their passion and prove they still have what it takes to shine
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/40" />
                                <input
                                    type="text"
                                    placeholder="Search artists by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                />
                            </div>

                            {/* Team Filter */}
                            <select
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                className="px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white"
                            >
                                <option value="">All Teams</option>
                                {allTeams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="eliminated">Eliminated</option>
                                <option value="winner">Winner</option>
                                <option value="finalist">Finalist</option>
                                <option value="alumni">Alumni</option>
                            </select>
                        </div>

                        {/* Active Filters Display */}
                        {(searchQuery || selectedTeam || selectedStatus) && (
                            <div className="mt-4 pt-4 border-t border-secondary">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-text/70">
                                        Showing {filteredArtists.length} of {artists.length} artists
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedTeam('');
                                            setSelectedStatus('');
                                        }}
                                        className="text-sm text-primary hover:text-accent transition-colors duration-300"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Artists Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredArtists.map((artist) => {
                        const teams = Array.isArray(artist.teams)
                            ? artist.teams.map((team: any) => typeof team === 'object' ? team : null).filter(Boolean)
                            : [];

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
                                            <Users className="w-20 h-20 text-primary/30" />
                                        </div>
                                    )}

                                    {/* Multiple Team Badges */}
                                    {teams.length > 0 && (
                                        <div className="absolute top-3 left-3 right-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {teams.slice(0, 2).map((team: any) => (
                                                    <div
                                                        key={team.id}
                                                        className={`px-2 py-1 rounded-full text-xs font-medium border ${teamColorClasses[team.color] || 'bg-primary/10 text-primary border-primary/20'}`}
                                                    >
                                                        {team.name}
                                                    </div>
                                                ))}
                                                {teams.length > 2 && (
                                                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                        +{teams.length - 2}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Captain Badge */}
                                    {artist.isTeamCaptain && (
                                        <div className="absolute top-3 right-3 bg-yellow-500 text-white p-1.5 rounded-full shadow-lg" title="Team Captain">
                                            <Crown className="w-4 h-4" />
                                        </div>
                                    )}

                                    {/* Status Badge (if not active) */}
                                    {artist.status && artist.status !== 'active' && (
                                        <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                                            artist.status === 'winner' ? 'bg-yellow-100 text-yellow-600 border border-yellow-200' :
                                                artist.status === 'finalist' ? 'bg-green-100 text-green-600 border border-green-200' :
                                                    'bg-gray-100 text-gray-600 border border-gray-200'
                                        }`}>
                                            {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                        {artist.name}
                                    </h3>

                                    {artist.stageName && artist.stageName !== artist.name && (
                                        <p className="text-sm text-text/70 mb-3 line-clamp-1">{artist.stageName}</p>
                                    )}

                                    {/* Stats */}
                                    <div className="space-y-2 text-sm text-text/70 mb-4">
                                        <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-accent" />
                        <span>Votes</span>
                      </span>
                                            <span className="font-medium text-text">
                        {artist.stats?.totalVotes ? `${(artist.stats.totalVotes / 1000).toFixed(0)}K` : '0'}
                      </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Followers</span>
                      </span>
                                            <span className="font-medium text-text">
                        {artist.stats?.followers ? `${(artist.stats.followers / 1000).toFixed(0)}K` : '0'}
                      </span>
                                        </div>
                                    </div>

                                    {/* Profession Tags */}
                                    {artist.profession && Array.isArray(artist.profession) && artist.profession.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {artist.profession.slice(0, 2).map((prof: string, idx: number) => (
                                                <span key={idx} className="text-xs bg-secondary text-text/70 px-2 py-0.5 rounded">
                          {prof}
                        </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Button */}
                                    <button className="w-full btn-secondary text-sm py-2">
                                        View Profile
                                    </button>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredArtists.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-text/30 mx-auto mb-4" />
                        <p className="text-text/70 mb-4">No artists found matching your filters.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedTeam('');
                                setSelectedStatus('');
                            }}
                            className="btn-secondary"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}