/**
 * AJIL Finance Lottie Animation Data
 * 
 * These are programmatically generated Lottie-compatible animation objects
 * that follow the AJIL brand guidelines with the signature V shape.
 * 
 * Color palette:
 * - Primary Blue: #00377B (0, 55, 123)
 * - Secondary Orange: #F7941D (247, 148, 29)
 * - White: #FFFFFF
 */

// Base colors as RGB arrays for Lottie
const AJIL_BLUE = [0, 0.216, 0.482] // #00377B normalized
const AJIL_ORANGE = [0.969, 0.58, 0.114] // #F7941D normalized
const WHITE = [1, 1, 1]

// Helper to create keyframe animation
function createKeyframes(
  startValue: number[],
  endValue: number[],
  startFrame: number,
  endFrame: number,
  easing: number[][] = [[0.42, 0, 0.58, 1]] // ease-in-out
) {
  return {
    a: 1,
    k: [
      {
        t: startFrame,
        s: startValue,
        o: { x: [easing[0][0]], y: [easing[0][1]] },
        i: { x: [easing[0][2]], y: [easing[0][3]] },
      },
      {
        t: endFrame,
        s: endValue,
      },
    ],
  }
}

// ============================================
// 1. AJIL Logo Animation - V Symbol Draw
// ============================================
export const ajilLogoAnimation = {
  v: '5.9.6',
  fr: 60,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: 'AJIL Logo Animation',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'V Shape',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: createKeyframes([0, 0, 100], [100, 100, 100], 0, 30),
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              d: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-50, -30], [0, 40], [50, -30]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_BLUE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2, // round cap
              lj: 2, // round join
            },
            {
              ty: 'tm',
              s: { a: 0, k: 0 },
              e: createKeyframes([0], [100], 0, 45),
              o: { a: 0, k: 0 },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'V Path',
        },
      ],
    },
    // Glow effect layer
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Glow',
      sr: 1,
      ks: {
        o: createKeyframes([0], [60], 30, 60),
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [110, 110, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              d: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-50, -30], [0, 40], [50, -30]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_ORANGE, 1] },
              o: { a: 0, k: 30 },
              w: { a: 0, k: 20 },
              lc: 2,
              lj: 2,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Glow Path',
        },
      ],
      bm: 0,
    },
  ],
}

// ============================================
// 2. Loading Spinner Animation
// ============================================
export const loadingSpinnerAnimation = {
  v: '5.9.6',
  fr: 60,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: 'AJIL Loading Spinner',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Spinner Arc',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
            { t: 60, s: [360] },
          ],
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: { a: 0, k: [70, 70] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_BLUE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
              lc: 2,
              lj: 2,
            },
            {
              ty: 'tm',
              s: { a: 0, k: 0 },
              e: { a: 0, k: 75 },
              o: {
                a: 1,
                k: [
                  { t: 0, s: [0], o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
                  { t: 60, s: [360] },
                ],
              },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Arc',
        },
      ],
    },
    // Inner V symbol
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Center V',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 30, s: [110, 110, 100], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 60, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              d: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-15, -10], [0, 12], [15, -10]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_ORANGE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 2,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'V',
        },
      ],
    },
  ],
}

// ============================================
// 3. Success Checkmark Animation
// ============================================
export const successAnimation = {
  v: '5.9.6',
  fr: 60,
  ip: 0,
  op: 60,
  w: 120,
  h: 120,
  nm: 'AJIL Success',
  ddd: 0,
  assets: [],
  layers: [
    // Circle background
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: createKeyframes([0, 0, 100], [100, 100, 100], 0, 20),
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0.2, 0.8, 0.4, 1] }, // Green
              o: { a: 0, k: 100 },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Circle',
        },
      ],
    },
    // Checkmark (AJIL V style)
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Checkmark',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              d: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-25, 0], [-5, 20], [25, -15]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...WHITE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 2,
            },
            {
              ty: 'tm',
              s: { a: 0, k: 0 },
              e: createKeyframes([0], [100], 15, 45),
              o: { a: 0, k: 0 },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Check',
        },
      ],
    },
  ],
}

// ============================================
// 4. Pulse Animation (for buttons/icons)
// ============================================
export const pulseAnimation = {
  v: '5.9.6',
  fr: 60,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: 'AJIL Pulse',
  ddd: 0,
  assets: [],
  layers: [
    // Outer pulse rings
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Pulse Ring 1',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [60], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 60, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [50, 50, 100], o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
            { t: 60, s: [150, 150, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_BLUE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Ring',
        },
      ],
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Pulse Ring 2',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 20, s: [60], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 60, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 20, s: [50, 50, 100], o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
            { t: 60, s: [130, 130, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'el',
              d: 1,
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_ORANGE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Ring 2',
        },
      ],
    },
    // Center V
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'Center V',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 30, s: [115, 115, 100], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 60, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              d: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-20, -12], [0, 15], [20, -12]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: [...AJIL_BLUE, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
              lc: 2,
              lj: 2,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'V',
        },
      ],
    },
  ],
}

// ============================================
// 5. Confetti Celebration Animation
// ============================================
export const confettiAnimation = {
  v: '5.9.6',
  fr: 60,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: 'AJIL Confetti',
  ddd: 0,
  assets: [],
  layers: Array.from({ length: 12 }, (_, i) => ({
    ddd: 0,
    ind: i + 1,
    ty: 4,
    nm: `Confetti ${i + 1}`,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          { t: 0, s: [0] },
          { t: 10, s: [100] },
          { t: 70, s: [100] },
          { t: 90, s: [0] },
        ],
      },
      r: {
        a: 1,
        k: [
          { t: 0, s: [0], o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
          { t: 90, s: [360 * (i % 2 === 0 ? 1 : -1)] },
        ],
      },
      p: {
        a: 1,
        k: [
          {
            t: 0,
            s: [100, 100, 0],
            o: { x: [0.2], y: [0] },
            i: { x: [0.8], y: [1] },
          },
          {
            t: 90,
            s: [
              100 + Math.cos((i * Math.PI * 2) / 12) * 80,
              100 + Math.sin((i * Math.PI * 2) / 12) * 80 + 50,
              0,
            ],
          },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: 'gr',
        it: [
          {
            ty: 'rc',
            d: 1,
            s: { a: 0, k: [8, 8] },
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 2 },
          },
          {
            ty: 'fl',
            c: {
              a: 0,
              k: i % 3 === 0 
                ? [...AJIL_BLUE, 1] 
                : i % 3 === 1 
                  ? [...AJIL_ORANGE, 1] 
                  : [0.2, 0.8, 0.4, 1],
            },
            o: { a: 0, k: 100 },
          },
          {
            ty: 'tr',
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
        nm: `Particle ${i + 1}`,
      },
    ],
  })),
}

// ============================================
// 6. Progress Bar Animation
// ============================================
export const progressBarAnimation = {
  v: '5.9.6',
  fr: 60,
  ip: 0,
  op: 120,
  w: 300,
  h: 30,
  nm: 'AJIL Progress Bar',
  ddd: 0,
  assets: [],
  layers: [
    // Background track
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Track',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 15, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [280, 12] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 6 },
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0.9, 0.9, 0.9, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Track BG',
        },
      ],
    },
    // Progress fill
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Progress',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [16, 15, 0] },
        a: { a: 0, k: [-134, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 100, 100], o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } },
            { t: 120, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [268, 8] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 4 },
            },
            {
              ty: 'gf',
              o: { a: 0, k: 100 },
              r: 1,
              s: { a: 0, k: [-134, 0] },
              e: { a: 0, k: [134, 0] },
              t: 1,
              g: {
                p: 3,
                k: {
                  a: 0,
                  k: [0, ...AJIL_BLUE, 0.5, ...AJIL_BLUE, 1, ...AJIL_ORANGE],
                },
              },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Fill',
        },
      ],
    },
    // Shimmer effect
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'Shimmer',
      sr: 1,
      ks: {
        o: { a: 0, k: 40 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [-20, 15, 0], o: { x: [0], y: [0] }, i: { x: [1], y: [1] } },
            { t: 60, s: [320, 15, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [40, 8] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 4 },
            },
            {
              ty: 'gf',
              o: { a: 0, k: 100 },
              r: 1,
              s: { a: 0, k: [-20, 0] },
              e: { a: 0, k: [20, 0] },
              t: 1,
              g: {
                p: 3,
                k: {
                  a: 0,
                  k: [0, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1],
                },
              },
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
          nm: 'Shimmer',
        },
      ],
    },
  ],
}

// Export all animations
export const ajilAnimations = {
  logo: ajilLogoAnimation,
  loading: loadingSpinnerAnimation,
  success: successAnimation,
  pulse: pulseAnimation,
  confetti: confettiAnimation,
  progress: progressBarAnimation,
}

export default ajilAnimations
