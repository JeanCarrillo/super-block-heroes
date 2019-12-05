export const pieces = [
  {
    type: 'T',
    shapes: [
      [
        // default
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      // rotation 1 right
      [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
      // rotation 2 right
      [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
      // roration 3 right
      [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
    ]
  },

  {
    type: 'Z',
    shapes: [
      [
        // default
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      // rotation 1 right
      [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
      // rotaion 2 right
      [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
      // roration 3 right
      [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
    ]
  },

  {
    type: 'S',
    shapes: [
      [
        // default
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      // rotation 1 right
      [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
      // rotaion 2 right
      [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
      // roration 3 right
      [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
    ]
  },

  {
    type: 'L',
    shapes: [
      // default
      [[1, 0, 0], [1, 0, 0], [1, 1, 0]],
      // rotation 1 right
      [[1, 1, 1], [1, 0, 0], [0, 0, 0]],
      // rotaion 2 right
      [[0, 1, 1], [0, 0, 1], [0, 0, 1]],
      // roration 3 right
      [[0, 0, 0], [0, 0, 1], [1, 1, 1]]
    ]
  },
  {
    type: 'J',
    shapes: [
      // default
      [[0, 0, 1], [0, 0, 1], [0, 1, 1]],
      // rotation 1 right
      [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
      // rotaion 2 right
      [[1, 1, 0], [1, 0, 0], [1, 0, 0]],
      // roration 3 right
      [[1, 1, 1], [0, 0, 1], [0, 0, 0]]
    ]
  },
  {
    type: 'O',
    shapes: [
      // default and unique shape
      [[1, 1], [1, 1]]
    ]
  },
  {
    type: 'I',
    shapes: [
      // default
      [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
      // rotation 1 right
      [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      // rotaion 2 right
      [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
      // roration 3 right
      [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]
    ]
  }
];
