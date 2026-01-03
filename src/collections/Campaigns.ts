import type { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
    slug: 'campaigns',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'type', 'startDate', 'endDate', 'active'],
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
            label: 'Campaign Title',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'richText',
            required: true,
            label: 'Campaign Description',
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                { label: 'Voting Campaign', value: 'voting' },
                { label: 'Hashtag Challenge', value: 'hashtag' },
                { label: 'Charity/Fundraising', value: 'charity' },
                { label: 'Streaming Goal', value: 'streaming' },
                { label: 'Social Media Drive', value: 'social-media' },
                { label: 'Fan Project', value: 'fan-project' },
            ],
        },
        {
            name: 'artists',
            type: 'relationship',
            relationTo: 'artists',
            hasMany: true,
            label: 'Related Artists',
            admin: {
                description: 'Artists this campaign supports',
            },
        },
        {
            name: 'startDate',
            type: 'date',
            required: true,
            label: 'Start Date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'endDate',
            type: 'date',
            required: true,
            label: 'End Date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'active',
            type: 'checkbox',
            label: 'Currently Active',
            defaultValue: true,
            admin: {
                description: 'Automatically calculated based on dates, but can be manually overridden',
            },
        },
        {
            name: 'campaignImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Campaign Banner/Image',
        },
        {
            name: 'hashtags',
            type: 'array',
            label: 'Campaign Hashtags',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Without # symbol',
                    },
                },
                {
                    name: 'platform',
                    type: 'select',
                    options: [
                        { label: 'All Platforms', value: 'all' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'Twitter/X', value: 'twitter' },
                        { label: 'Facebook', value: 'facebook' },
                    ],
                },
            ],
        },
        {
            name: 'goals',
            type: 'array',
            label: 'Campaign Goals',
            fields: [
                {
                    name: 'description',
                    type: 'text',
                    required: true,
                    label: 'Goal Description',
                },
                {
                    name: 'target',
                    type: 'number',
                    label: 'Target Number',
                    admin: {
                        description: 'e.g., 100000 for votes, followers, etc.',
                    },
                },
                {
                    name: 'current',
                    type: 'number',
                    defaultValue: 0,
                    label: 'Current Progress',
                },
                {
                    name: 'unit',
                    type: 'text',
                    label: 'Unit',
                    admin: {
                        description: 'e.g., "votes", "followers", "VND"',
                    },
                },
                {
                    name: 'achieved',
                    type: 'checkbox',
                    label: 'Goal Achieved',
                    defaultValue: false,
                },
            ],
        },
        {
            name: 'instructions',
            type: 'richText',
            label: 'How to Participate',
            admin: {
                description: 'Step-by-step instructions for fans',
            },
        },
        {
            name: 'externalLinks',
            type: 'array',
            label: 'Important Links',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'e.g., "Voting Page", "Donation Link"',
                    },
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'updates',
            type: 'array',
            label: 'Campaign Updates',
            fields: [
                {
                    name: 'date',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'message',
                    type: 'richText',
                    required: true,
                },
            ],
        },
        {
            name: 'featured',
            type: 'checkbox',
            label: 'Feature on Homepage',
            defaultValue: false,
        },
    ],
}