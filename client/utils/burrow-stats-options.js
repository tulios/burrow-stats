import SettingsStore from '../utils/settings-store'

const defaultSettings =  {
  cacheBinSize: 30,
  pollInterval: 10
}

export default function() {
  const customSettings = SettingsStore.get().burrowStatsOptions || {}
  return Object.assign(defaultSettings, customSettings)
}
