import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

// const title = 'Zouq: Halal Marketplace';
// const description =
//   'Zouq: Your One Stop Halal Destination. Discover the ease and convenience of finding Halal products and services here in Zouq halal marketplace. Join us today and be a part of a thriving community.';
// const url = 'https://shop.dev.zouq.online';

export const metadata: Metadata = {
    title: 'Template App',
    description: 'Premade email template app.',
    //     keywords: ['zouq', 'halal', 'halal marketplace', 'marketplace', 'restaurant', 'hotel'],
    //   icons: {
    //     icon: { url: '/favicon.svg', type: 'image/svg' },
    //     shortcut: { url: '/favicon.svg', type: 'image/svg' }
    //   },
    //   openGraph: {
    //     type: 'website',
    //     url,
    //     title,
    //     description,
    //     siteName: title,
    //     images: `${url}/meta/og.png`
    //   },
    //   twitter: { card: 'summary_large_image', site: '@zouqonline', creator: '@zouqonline', images: `${url}/meta/og.png` }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
