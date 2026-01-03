import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'eventDate', 'type', 'status'],
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
            label: 'Event Title',
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
            label: 'Event Description',
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                { label: 'Concert/Performance', value: 'concert' },
                { label: 'Fan Meeting', value: 'fan-meeting' },
                { label: 'TV Appearance', value: 'tv-appearance' },
                { label: 'Award Show', value: 'award-show' },
                { label: 'Interview', value: 'interview' },
                { label: 'Charity Event', value: 'charity' },
                { label: 'Other', value: 'other' },
            ],
        },
        {
            name: 'eventDate',
            type: 'date',
            required: true,
            label: 'Event Date & Time',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'endDate',
            type: 'date',
            label: 'End Date (for multi-day events)',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'location',
            type: 'group',
            fields: [
                {
                    name: 'venue',
                    type: 'text',
                    label: 'Venue Name',
                },
                {
                    name: 'address',
                    type: 'textarea',
                    label: 'Full Address',
                },
                {
                    name: 'city',
                    type: 'text',
                },
                {
                    name: 'country',
                    type: 'text',
                    defaultValue: 'Vietnam',
                },
                {
                    name: 'mapLink',
                    type: 'text',
                    label: 'Google Maps Link',
                },
            ],
        },
        {
            name: 'artists',
            type: 'relationship',
            relationTo: 'artists',
            hasMany: true,
            required: true,
            label: 'Participating Artists',
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Event Poster/Image',
        },
        {
            name: 'ticketInfo',
            type: 'group',
            label: 'Ticket Information',
            fields: [
                {
                    name: 'available',
                    type: 'checkbox',
                    label: 'Tickets Available',
                    defaultValue: false,
                },
                {
                    name: 'ticketLink',
                    type: 'text',
                    label: 'Ticket Purchase Link',
                },
                {
                    name: 'price',
                    type: 'text',
                    label: 'Price Range',
                    admin: {
                        description: 'e.g., "500,000 - 2,000,000 VND"',
                    },
                },
            ],
        },
        {
            name: 'links',
            type: 'array',
            label: 'Related Links',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'upcoming',
            options: [
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
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