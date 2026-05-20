import path from 'path'
import { buildConfig, CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

import Collections from './collections/index'
import Globals from './globals/index'
import { postgresAdapter } from '@payloadcms/db-postgres'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        hidden: true,
    },
    auth: {
        loginWithUsername: true,
    },
    access: {
        read: () => true,
        update: () => false,
        delete: () => false,
    },
    fields: [],
}

export default buildConfig({
    routes: {
        admin: '/',
    },
    admin: {
        autoLogin: process.env.PAYLOAD_AUTOLOGIN === "true"
            ? {
                username: 'admin',
                password: 'admin',
            }
            : undefined,
    },
    collections: [...Collections, Users],
    globals: Globals,
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            user: process.env.PAYLOAD_PGUSER,
            password: process.env.PAYLOAD_PGPASSWORD,
            host: process.env.PAYLOAD_PGHOST,
            port: parseInt(process.env.PAYLOAD_PGPORT || '5432'),
            database: process.env.PAYLOAD_PGDATABASE,
        },
    }),
    onInit: async (payload) => {
        if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
            payload.create({
                collection: 'users',
                data: {
                    username: 'admin',
                    password: 'admin',
                },
            })
        }
    },
    plugins: [],
})
