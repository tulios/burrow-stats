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
  const currentTime = moment().format('H:mm:ss')
  const consumerGroupOffsets = consumer.consumer_group.offsets
  const topicOffsets = consumer.topic.offsets
  const totalLag = topicOffsets
    .map((value, i) => value - consumerGroupOffsets[i])
    .map((value) => value >= 0 ? value : 0)
    .reduce((total, value) => total + value, 0)

  const currentCache = read(cacheName)
  let newCache = { series: [{time: currentTime, totalLag: totalLag}] }

  if (currentCache) {
    if (isTimeRegistered(currentCache, currentTime)) {
      return currentCache
    }

    currentCache.series = currentCache.series.concat(newCache.series)
    const missingElements = SERIES_MAX_LENGTH - currentCache.series.length

    for (let i=0; i < missingElements; i++) {
      currentCache.series.unshift({time: currentTime, totalLag: 0})
    }

    if (missingElements < 0) {
      currentCache.series.shift()
    }

    newCache = currentCache
  }

  write(cacheName, newCache)

  return newCache
}

function isTimeRegistered(cache, time) {
  return (cache.series || []).map(e => e.time).indexOf(time) !== -1
}

export default { read, write, readTotalLag, refreshTotalLag }
