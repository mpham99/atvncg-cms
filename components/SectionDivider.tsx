export default function SectionDivider() {
    return (
        <div className="container-custom py-8">
            <div className="relative flex items-center justify-center">
                {/* Left line */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-primary/40" />

                {/* Center decoration */}
                <div className="mx-6">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                    >
                        <circle cx="20" cy="20" r="3" fill="currentColor" />
                        <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.6" />
                        <circle cx="20" cy="30" r="2" fill="currentColor" opacity="0.6" />
                        <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.4" />
                        <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.4" />
                    </svg>
                </div>

                {/* Right line */}
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/20 to-primary/40" />
            </div>
        </div>
    );
}