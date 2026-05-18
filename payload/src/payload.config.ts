import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Nav } from './globals/Nav'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    routes: {
        admin: '/',
    },
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        autoLogin: {
            username: 'admin',
            password: 'admin',
        },
    },
    collections: [Users, Media, Pages],
    globals: [Nav],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URL || '',
    }),
    onInit: async (payload) => {
        payload.create({
            collection: 'users',
            data: {
                username: 'admin',
                password: 'admin',
            },
        })
    },
    endpoints: [
        {
            path: '/health',
            method: 'get',
            handler: async () => {
                return new Response('OK', { status: 200 })
            },
        },
    ],
    plugins: [
        nestedDocsPlugin({
            collections: ['pages'],
            generateLabel: (_, doc) => String(doc.title),
            generateURL: (docs) =>
                docs.reduce((url, doc) => `${url}/${String(doc.slug)}`, ''),
        }),
    ],
})
