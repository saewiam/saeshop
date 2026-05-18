import type { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
    slug: 'nav',
    fields: [
        {
            name: 'links',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'page',
                    type: 'relationship',
                    relationTo: 'pages',
                    required: true,
                    hasMany: false,
                },
                {
                    name: 'sublinks',
                    type: 'array',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'page',
                            type: 'relationship',
                            relationTo: 'pages',
                            required: true,
                            hasMany: false,
                        },
                        {
                            name: 'url',
                            type: 'text',
                            virtual: true,
                            hooks: {
                                afterRead: [
                                    async ({
                                        siblingData,
                                        req: { payload },
                                    }) => {
                                        const page = await payload.findByID({
                                            collection: 'pages',
                                            id: siblingData.page,
                                        })
                                        return page.url
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    name: 'url',
                    type: 'text',
                    virtual: true,
                    hooks: {
                        afterRead: [
                            async ({ siblingData, req: { payload } }) => {
                                const page = await payload.findByID({
                                    collection: 'pages',
                                    id: siblingData.page,
                                })
                                return page.url
                            },
                        ],
                    },
                },
            ],
        },
    ],
}
