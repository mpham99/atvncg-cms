import type { CollectionConfig } from 'payload'

export const Teams: CollectionConfig = {
    slug: 'teams',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'color', 'captain'],
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
            unique: true,
            label: 'Team Name',
            admin: {
                description: 'e.g., "Nhà trẻ", "Nhà trai", "Nhà gái"',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'URL-friendly version (e.g., "team-a")',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Team Description',
            admin: {
                description: 'Brief description of the team',
            },
        },
        {
            name: 'color',
            type: 'select',
            required: true,
            defaultValue: 'red',
            options: [
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' },
                { label: 'Purple', value: 'purple' },
                { label: 'Orange', value: 'orange' },
                { label: 'Yellow', value: 'yellow' },
                { label: 'Pink', value: 'pink' },
                { label: 'Teal', value: 'teal' },
            ],
            label: 'Team Color',
            admin: {
                description: 'Primary color for team branding',
            },
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            label: 'Team Logo',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Team Cover Image',
        },
        {
            name: 'captain',
            type: 'relationship',
            relationTo: 'artists',
            label: 'Team Captain',
            admin: {
                description: 'The leader/captain of this team',
            },
        },
        {
            name: 'motto',
            type: 'text',
            label: 'Team Motto',
            admin: {
                description: 'Team slogan or motto',
            },
        },
        {
            name: 'stats',
            type: 'group',
            label: 'Team Statistics',
            fields: [
                {
                    name: 'totalVotes',
                    type: 'number',
                    defaultValue: 0,
                    label: 'Total Team Votes',
                    admin: {
                        description: 'Combined votes from all team members',
                    },
                },
                {
                    name: 'wins',
                    type: 'number',
                    defaultValue: 0,
                    label: 'Total Wins',
                    admin: {
                        description: 'Number of challenges/competitions won',
                    },
                },
                {
                    name: 'performances',
                    type: 'number',
                    defaultValue: 0,
                    label: 'Total Performances',
                },
            ],
        },
        {
            name: 'socialMedia',
            type: 'group',
            label: 'Team Social Media',
            fields: [
                {
                    name: 'facebook',
                    type: 'text',
                    label: 'Facebook Page',
                },
                {
                    name: 'instagram',
                    type: 'text',
                    label: 'Instagram Handle',
                },
                {
                    name: 'tiktok',
                    type: 'text',
                    label: 'TikTok Handle',
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
            label: 'Team Hashtags',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Without # symbol (e.g., "TeamFireVN")',
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
            name: 'active',
            type: 'checkbox',
            label: 'Active Team',
            defaultValue: true,
            admin: {
                description: 'Is this team currently competing?',
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            label: 'Feature on Homepage',
            defaultValue: false,
        },
    ],
}