export function chartPalette(i) {
  const palette = [
    {
      fillColor: 'rgba(0, 137, 207, 0.3)',
      strokeColor: 'rgba(0, 137, 207, 1)',
      pointColor: 'rgba(0, 137, 207, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(0, 137, 207, 1)',
    },
    {
      fillColor: 'rgba(142, 142, 142, 0.3)',
      strokeColor: 'rgba(142, 142, 142, 1)',
      pointColor: 'rgba(142, 142, 142, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(142, 142, 142, 1)',
    },
    {
      fillColor: 'rgba(250, 164, 58, 0.3)',
      strokeColor: 'rgba(250, 164, 58, 1)',
      pointColor: 'rgba(250, 164, 58, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(250, 164, 58, 1)',
    },
    {
      fillColor: 'rgba(96, 189, 104, 0.3)',
      strokeColor: 'rgba(96, 189, 104, 1)',
      pointColor: 'rgba(96, 189, 104, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(96, 189, 104, 1)',
    },
    {
      fillColor: 'rgba(241, 88, 84, 0.3)',
      strokeColor: 'rgba(241, 88, 84, 1)',
      pointColor: 'rgba(241, 88, 84, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(241, 88, 84, 1)',
    },
    {
      fillColor: 'rgba(241, 124, 176, 0.3)',
      strokeColor: 'rgba(241, 124, 176, 1)',
      pointColor: 'rgba(241, 124, 176, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(241, 124, 176, 1)',
    },
    {
      fillColor: 'rgba(222, 207, 63, 0.3)',
      strokeColor: 'rgba(222, 207, 63, 1)',
      pointColor: 'rgba(222, 207, 63, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(222, 207, 63, 1)',
    },
    {
      fillColor: 'rgba(178, 118, 178, 0.3)',
      strokeColor: 'rgba(178, 118, 178, 1)',
      pointColor: 'rgba(178, 118, 178, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(178, 118, 178, 1)',
    },
    {
      fillColor: 'rgba(178, 145, 47, 0.3)',
      strokeColor: 'rgba(178, 145, 47, 1)',
      pointColor: 'rgba(178, 145, 47, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(178, 145, 47, 1)',
    },
    {
      fillColor: 'rgba(137, 137, 207, 0.3)',
      strokeColor: 'rgba(137, 137, 207, 1)',
      pointColor: 'rgba(137, 137, 207, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(137, 137, 207, 1)',
    }
  ]
  return palette[i || 0] || palette[0]
}

export default function(data, label, merge) {
  return Object.assign({
    label: label,
    data: data
  }, merge || chartPalette())
}
