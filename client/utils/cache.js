import moment from 'moment'
const SERIES_MAX_LENGTH = 30

function cacheKey(name) {
  return `burrowStats-${name}`
}

function write(name, cache) {
  localStorage.setItem(cacheKey(name), JSON.stringify(cache))
}

function read(name) {
  return JSON.parse(localStorage.getItem(cacheKey(name)))
}

function readTotalLag(name) {
  return read(`total-lag-${name}`)
}

function refreshTotalLag(consumer) {
  const cacheName = `total-lag-${consumer.name}`
  const consumerGroupOffsets = consumer.consumer_group.offsets
  const topicOffsets = consumer.topic.offsets
  const totalLag = topicOffsets
    .map((value, i) => value - consumerGroupOffsets[i])
    .map((value) => value >= 0 ? value : 0)
    .reduce((total, value) => total + value, 0)

  const oldCache = read(cacheName)
  let newCache = { series: [{time: moment(), totalLag: totalLag}] }

  if (oldCache) {
    oldCache.series = oldCache.series.concat(newCache.series)
    if (oldCache.series.length > SERIES_MAX_LENGTH) {
      oldCache.series.shift()
    }
    newCache = oldCache
  }

  write(cacheName, newCache)
}

export default { read, write, readTotalLag, refreshTotalLag }
