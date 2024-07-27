module.exports = {
    content: [
        "./components/**/*.vue",
        "./app.vue",
    ],
    theme: {
        extend: {
            screens: {
                xs: '320px',
                s: '428px',
                sm: '768px',
                md: '1024px',
                lg: '1200px',
                xl: '1512px',
            },
            colors: {
                theme: {
                    bgColor: '#f2f2f2',
                    brand: '#6200ea',
                    transparentBg: '#6200ea80'
                }
            }
        },
    },
    plugins: [],
}