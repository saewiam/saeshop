import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        hidden: true,
    },
    auth: {
        loginWithUsername: true,
    },
    access: {
        create: ({ req: { user } }) => {
            return user ? user.username === 'admin' : false
        },
        read: () => true,
        update: () => false,
        delete: () => false,
    },
    fields: [],
}
