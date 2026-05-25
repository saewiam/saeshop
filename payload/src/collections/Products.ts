import { CollectionConfig, Field } from 'payload'

const images: Field = {
    name: 'images',
    type: 'relationship',
    relationTo: 'media',
    required: true,
    hasMany: true,
    admin: {
        appearance: 'drawer',
    },
}
const price: Field = {
    name: 'price',
    label: 'Price (USD)',
    type: 'number',
    required: true,
    min: 0,
}

export const Product: CollectionConfig = {
    slug: 'product',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        price,
        images,
        {
            name: 'varieties',
            type: 'array',
            required: false,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'usesDefaultPrice',
                    type: 'checkbox',
                    defaultValue: true,
                },
                {
                    ...price,
                    defaultValue: 0.0,
                    required: false,
                    admin: {
                        condition: (siblingData) => {
                            return !siblingData.usesDefaultPrice
                        },
                    },
                },
                images,
            ],
        },
    ],
}
