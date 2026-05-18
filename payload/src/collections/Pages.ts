import { createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
import type {
    Block,
    CollectionConfig,
    TextFieldSingleValidation,
} from 'payload'

export const ImageColumn: Block = {
    slug: 'imageColumn',
    admin: {
        disableBlockName: true,
    },
    fields: [
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'media',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}

export const GridBlock: Block = {
    slug: 'grid',
    admin: {
        disableBlockName: true,
    },
    fields: [
        {
            name: 'columns',
            type: 'blocks',
            blocks: [ImageColumn],
        },
    ],
}

const duplicatePageValidation = (async (value, { id, req }) => {
    const duplicateQuery = await req.payload.find({
        collection: 'pages',
        depth: 0,
        where: {
            url: {
                equals: value,
            },
            id: {
                not_equals: id,
            },
        },
    })
    return (
        duplicateQuery.totalDocs === 0 ||
        `An existing page has the same URL: "${value}"`
    )
}) satisfies TextFieldSingleValidation

const slugValidation = (async (value) => {
    const normalized = value?.replace(/[^a-zA-Z0-9-_]/g, '')
    return (value === normalized && value !== '') || 'Not a valid URL slug'
}) satisfies TextFieldSingleValidation

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    versions: true,
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            validate: slugValidation,
        },
        {
            name: 'content',
            type: 'blocks',
            blocks: [ImageColumn, GridBlock],
        },
        {
            name: 'url',
            type: 'text',
            validate: duplicatePageValidation,
            access: {
                create: () => false,
                update: () => false,
            },
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        const i = siblingData.breadcrumbs.length - 1
                        return siblingData.breadcrumbs[i].url
                    },
                ],
                afterRead: [
                    ({ siblingData }) => {
                        const i = siblingData.breadcrumbs.length - 1
                        return siblingData.breadcrumbs[i].url
                    },
                ],
            },
        },
        createBreadcrumbsField('pages', {
            admin: {
                hidden: true,
            },
        }),
    ],
}
