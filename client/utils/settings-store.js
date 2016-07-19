let configs = null;

export default {
  set(newConfigs) {
    configs = newConfigs
  },

  get() {
    return (configs || {}).data
  },

  metadata() {
    return (configs || {}).meta
  }
}
