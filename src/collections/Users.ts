import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => {
            if (!user) return false
            return user.role === 'admin'
        },
        update: ({ req: { user } }) => {
            if (!user) return false
            return user.role === 'admin'
        },
        delete: ({ req: { user } }) => {
            if (!user) return false
            return user.role === 'admin'
        },
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            defaultValue: 'editor',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
                { label: 'Moderator', value: 'moderator' },
            ],
        },
    ],
}