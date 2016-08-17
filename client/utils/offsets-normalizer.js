export default function(offsets) {
  return offsets.map((value) => value >= 0 ? value : 0)
}
