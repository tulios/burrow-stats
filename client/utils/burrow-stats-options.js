import SettingsStore from '../utils/settings-store'

const defaultSettings =  {
  cacheDuration: 300,
  pollInterval: 10
}

export default function() {
  const customSettings = SettingsStore.get().burrowStatsOptions || {}
  return Object.assign(defaultSettings, customSettings)
}
