import SettingsStore from '../utils/settings-store'

const defaultSettings =  {
  cacheDuration: 3600,
  pollInterval: 60
}

export default function() {
  const customSettings = SettingsStore.get().burrowStatsOptions || {}
  return Object.assign(defaultSettings, customSettings)
}
