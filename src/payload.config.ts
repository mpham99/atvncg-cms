import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import collections
import { Users } from './collections/Users'
import { Teams } from './collections/Teams'
import { Artists } from './collections/Artists'
import { Events } from './collections/Events'
import { Campaigns } from './collections/Campaigns'
import { HashtagTracking } from './collections/HashtagTracking'
import { Media, News } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        meta: {
            titleSuffix: '- Call Me By Fire Fan Hub',
            icons: {
                icon: '/favicon.ico'
            },
            openGraph: {
                images: '/og-image.jpg'
            },
        },
    },
    collections: [
        Users,
        Teams,
        Artists,
        Events,
        Campaigns,
        HashtagTracking,
        News,
        Media,
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
    plugins: [
        // Add plugins here
    ],
})