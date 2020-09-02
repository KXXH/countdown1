module.exports = {
    pwa: {
      name: 'test',
      themeColor: '#4c89fe',
      msTileColor: '#4c89fe',
      manifestOptions: {
        start_url: '.',
        background_color: '#4c89fe'
      },
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        clientsClaim: true,
        skipWaiting: true
      }
    },
    publicPath: process.env.PUB_PATH || '/'
  }