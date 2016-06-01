import Mappersmith from 'mappersmith'
Mappersmith.Env.USE_PROMISES = true

const manifest = {
  host: false,
  resources: {
    Config: {
      load: {path: '/api/configs.json'}
    },
    Consumer: {
      lag:  {path: '/api/consumers/lag.json'},
      status:  {path: '/api/consumers/status.json'}
    }
  }
}

export default Mappersmith.forge(manifest)
