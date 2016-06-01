export default function(data, label, merge) {
  return Object.assign({
    label: label,
    fillColor: 'rgba(151, 187, 205, 0.3)',
    strokeColor: 'rgba(0, 137, 207, 1)',
    pointColor: 'rgba(0, 137, 207, 1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(0, 137, 207, 1)',
    data: data
  }, merge || {})
}
