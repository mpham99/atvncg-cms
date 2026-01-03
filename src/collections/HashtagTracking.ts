import type { CollectionConfig } from 'payload'

export const HashtagTracking: CollectionConfig = {
    slug: 'hashtag-tracking',
    admin: {
        useAsTitle: 'hashtag',
        defaultColumns: ['hashtag', 'platform', 'mentionCount', 'lastUpdated'],
        description: 'Automated tracking of hashtag performance across platforms',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'hashtag',
            type: 'text',
            required: true,
            label: 'Hashtag',
            admin: {
                description: 'Without # symbol (e.g., "CallMeByFire")',
            },
        },
        {
            name: 'platform',
            type: 'select',
            required: true,
            options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'Facebook', value: 'facebook' },
            ],
        },
        {
            name: 'relatedArtist',
            type: 'relationship',
            relationTo: 'artists',
            label: 'Related Artist',
            admin: {
                description: 'Optional: Link to specific artist',
            },
        },
        {
            name: 'relatedCampaign',
            type: 'relationship',
            relationTo: 'campaigns',
            label: 'Related Campaign',
            admin: {
                description: 'Optional: Link to specific campaign',
            },
        },
        {
            name: 'mentionCount',
            type: 'number',
            required: true,
            defaultValue: 0,
            label: 'Total Mentions',
            admin: {
                description: 'Current total count of hashtag uses',
            },
        },
        {
            name: 'metrics',
            type: 'group',
            label: 'Performance Metrics',
            fields: [
                {
                    name: 'daily',
                    type: 'number',
                    label: 'Daily Mentions',
                    admin: {
                        description: 'Mentions in last 24 hours',
                    },
                },
                {
                    name: 'weekly',
                    type: 'number',
                    label: 'Weekly Mentions',
                    admin: {
                        description: 'Mentions in last 7 days',
                    },
                },
                {
                    name: 'monthly',
                    type: 'number',
                    label: 'Monthly Mentions',
                    admin: {
                        description: 'Mentions in last 30 days',
                    },
                },
                {
                    name: 'totalEngagement',
                    type: 'number',
                    label: 'Total Engagement',
                    admin: {
                        description: 'Combined likes, shares, comments',
                    },
                },
                {
                    name: 'averageEngagement',
                    type: 'number',
                    label: 'Average Engagement per Post',
                },
                {
                    name: 'trending',
                    type: 'checkbox',
                    label: 'Currently Trending',
                    defaultValue: false,
                },
            ],
        },
        {
            name: 'lastUpdated',
            type: 'date',
            required: true,
            label: 'Last Updated',
            admin: {
                description: 'When data was last fetched from API',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'trackingEnabled',
            type: 'checkbox',
            label: 'Enable Tracking',
            defaultValue: true,
            admin: {
                description: 'Turn off to pause automatic updates',
            },
        },
    ],
}