'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Flame } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Artists', href: '/artists' },
        { name: 'Teams', href: '/teams' },
        { name: 'Events', href: '/events' },
        { name: 'Campaigns', href: '/campaigns' },
        { name: 'News', href: '/news' },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-primary">Call Me By Fire</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-text hover:text-primary transition-colors duration-300 font-medium relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-primary" />
                        ) : (
                            <Menu className="w-6 h-6 text-primary" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-secondary">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3 px-4 text-text hover:bg-secondary hover:text-primary transition-all duration-300 rounded-lg"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}