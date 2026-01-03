import type { CollectionConfig } from 'payload'

export const Artists: CollectionConfig = {
    slug: 'artists',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'stageName', 'teams', 'status'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Full Name',
        },
        {
            name: 'stageName',
            type: 'text',
            label: 'Stage Name',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'URL-friendly version of name (e.g., "tuan-hung")',
            },
        },
        {
            name: 'profileImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Profile Photo',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Cover Photo',
        },
        {
            name: 'bio',
            type: 'richText',
            label: 'Biography',
        },
        {
            name: 'birthDate',
            type: 'date',
            label: 'Date of Birth',
        },
        {
            name: 'teams',
            type: 'relationship',
            relationTo: 'teams',
            hasMany: true,
            label: 'Team Assignments',
            admin: {
                description: 'Select all teams this artist belongs to. Artists can be in multiple teams.',
            },
        },
        {
            name: 'isTeamCaptain',
            type: 'checkbox',
            label: 'Is Team Captain',
            defaultValue: false,
            admin: {
                description: 'Check if this artist is a captain of any team',
            },
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'active',
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Eliminated', value: 'eliminated' },
                { label: 'Winner', value: 'winner' },
                { label: 'Finalist', value: 'finalist' },
                { label: 'Alumni', value: 'alumni' },
            ],
        },
        {
            name: 'profession',
            type: 'select',
            options: [
                { label: 'Singer', value: 'singer' },
                { label: 'Actor', value: 'actor' },
                { label: 'Dancer', value: 'dancer' },
                { label: 'Comedian', value: 'comedian' },
                { label: 'TV Host', value: 'tv-host' },
                { label: 'Model', value: 'model' },
                { label: 'Musician', value: 'musician' },
                { label: 'Other', value: 'other' },
            ],
            hasMany: true,
            label: 'Profession(s)',
            admin: {
                description: 'Select all that apply',
            },
        },
        {
            name: 'achievements',
            type: 'array',
            label: 'Notable Achievements',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Achievement Title',
                },
                {
                    name: 'year',
                    type: 'number',
                    label: 'Year',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description',
                },
            ],
        },
        {
            name: 'socialMedia',
            type: 'group',
            label: 'Social Media Links',
            fields: [
                {
                    name: 'facebook',
                    type: 'text',
                    label: 'Facebook URL',
                },
                {
                    name: 'instagram',
                    type: 'text',
                    label: 'Instagram Handle',
                    admin: {
                        description: 'Just the username (e.g., "tuanhungofficial")',
                    },
                },
                {
                    name: 'tiktok',
                    type: 'text',
                    label: 'TikTok Handle',
                },
                {
                    name: 'youtube',
                    type: 'text',
                    label: 'YouTube Channel URL',
                },
                {
                    name: 'twitter',
                    type: 'text',
                    label: 'Twitter/X Handle',
                },
            ],
        },
        {
            name: 'hashtags',
            type: 'array',
            label: 'Official Hashtags',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Without # symbol (e.g., "TeamTuanHung")',
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
                    ],
                },
            ],
        },
        {
            name: 'stats',
            type: 'group',
            label: 'Statistics',
            fields: [
                {
                    name: 'totalVotes',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        description: 'Total fan votes received',
                    },
                },
                {
                    name: 'followers',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        description: 'Combined social media followers',
                    },
                },
                {
                    name: 'hashtagMentions',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        description: 'Total hashtag mentions across platforms',
                    },
                },
                {
                    name: 'performanceCount',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        description: 'Total number of performances on the show',
                    },
                },
                {
                    name: 'ranking',
                    type: 'number',
                    label: 'Current Ranking',
                    admin: {
                        description: 'Current position in the competition',
                    },
                },
            ],
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'Photo Gallery',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'Photo Date',
                },
            ],
        },
        {
            name: 'videos',
            type: 'array',
            label: 'Performance Videos',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                    label: 'Video URL (YouTube, TikTok, etc.)',
                },
                {
                    name: 'thumbnail',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Video Thumbnail',
                },
                {
                    name: 'performanceDate',
                    type: 'date',
                },
                {
                    name: 'description',
                    type: 'textarea',
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