import type { CollectionConfig } from 'payload'

// Media Collection
export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    upload: {
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
            label: 'Alt Text',
        },
        {
            name: 'caption',
            type: 'text',
            label: 'Caption',
        },
    ],
}

// News Collection
export const News: CollectionConfig = {
    slug: 'news',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'publishedDate', 'featured'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Article Title',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            label: 'Short Summary',
            admin: {
                description: 'Brief description for previews (max 200 characters)',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
            label: 'Article Content',
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                { label: 'Show Updates', value: 'show-updates' },
                { label: 'Artist News', value: 'artist-news' },
                { label: 'Behind the Scenes', value: 'behind-scenes' },
                { label: 'Fan Stories', value: 'fan-stories' },
                { label: 'Interviews', value: 'interviews' },
                { label: 'Announcements', value: 'announcements' },
            ],
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Featured Image',
        },
        {
            name: 'relatedArtists',
            type: 'relationship',
            relationTo: 'artists',
            hasMany: true,
            label: 'Related Artists',
        },
        {
            name: 'relatedEvents',
            type: 'relationship',
            relationTo: 'events',
            hasMany: true,
            label: 'Related Events',
        },
        {
            name: 'tags',
            type: 'array',
            label: 'Tags',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
        {
            name: 'author',
            type: 'text',
            label: 'Author Name',
            defaultValue: 'Admin',
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
            label: 'Publish Date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            label: 'Feature on Homepage',
            defaultValue: false,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
            ],
        },
    ],
}