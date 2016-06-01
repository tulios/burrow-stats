import SettingsStore from '../utils/settings-store'

const defaultSettings =  {
  animation: false,
  responsive: true,
  scaleFontSize: 14,
  scaleFontColor: '#879db7',
  scaleLineColor: 'rgba(255, 255, 255, 0.3)',
  scaleGridLineColor : 'rgba(255, 255, 255, 0.06)',
}

export default function() {
  const customSettings = SettingsStore.get().chartOptions || {}
  return Object.assign(defaultSettings, customSettings)
}
