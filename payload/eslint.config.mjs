import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
    tseslint.configs.recommended,
    globalIgnores([
        'build/**',
        'src/payload-types.ts',
        'src/payload-generated-schema.ts',
    ]),
    {
        rules: {
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: false,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^(_|ignore)',
                },
            ],
        },
    },
])

export default eslintConfig
