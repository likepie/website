let config = {
    plugins: [
        'tailwindcss',
        'postcss-preset-env',
    ],
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push([
        '@fullhuman/postcss-purgecss',
        {
            content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        }
    ]);
}

module.exports = config;