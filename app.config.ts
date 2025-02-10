export default defineAppConfig({
  ui: {
    primary: '',
    gray: '',
    tooltip: {
      default: {
        openDelay: 500
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  }
})
