import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Flame } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#', label: 'Follow us on Facebook' },
        { name: 'Instagram', icon: Instagram, href: '#', label: 'Follow us on Instagram' },
        { name: 'Twitter', icon: Twitter, href: '#', label: 'Follow us on Twitter' },
        { name: 'Youtube', icon: Youtube, href: '#', label: 'Subscribe on YouTube' },
    ];

    const footerLinks = {
        'About': [
            { name: 'About the Show', href: '/about' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Contact', href: '/contact' },
        ],
        'Community': [
            { name: 'All Artists', href: '/artists' },
            { name: 'Active Campaigns', href: '/campaigns' },
            { name: 'Fan Stories', href: '/fan-stories' },
        ],
        'Resources': [
            { name: 'Latest News', href: '/news' },
            { name: 'Event Calendar', href: '/events' },
            { name: 'Hashtag Tracker', href: '/hashtags' },
        ],
    };

    return (
        <footer className="bg-white border-t border-secondary mt-20">
            <div className="container-custom py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-primary p-2 rounded-lg">
                                <Flame className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-primary">Call Me By Fire</span>
                        </Link>
                        <p className="text-sm text-text/70 mb-4 max-w-md">
                            The ultimate fan hub for Call Me By Fire Vietnam. Follow all 33 artists,
                            track campaigns, and stay updated with the latest events and news.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="bg-secondary p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-bold text-primary mb-4">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-text/70 hover:text-primary transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="section-divider" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm text-text/70">
                        © {currentYear} Call Me By Fire Fan Hub. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/privacy" className="text-text/70 hover:text-primary transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-text/70 hover:text-primary transition-colors duration-300">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}