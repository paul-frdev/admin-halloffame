module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        cover: 'var(--image-cover)',
        logo: 'var(--image-logo)',
      },
      backgroundColor: {
        gray: '#808080',
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: true,
  // },
};
