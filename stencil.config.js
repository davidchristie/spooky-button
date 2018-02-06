module.exports = {
  config: {
    bundles: [
      {
        components: [
          'spooky-button'
        ]
      }
    ],
    generateDistribution: true,
    namespace: 'spooky'
  },
  devServer: {
    root: 'www',
    watchGlob: '**/**'
  }
}
