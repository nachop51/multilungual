type Glove = { hand: 'L' | 'R'; color: string }

function matchGloves(gloves: Glove[]): string[] {
  const count = new Map<string, { L: number; R: number }>()

  for (const glove of gloves) {
    let obj = count.get(glove.color)

    if (!obj) {
      obj = { L: 0, R: 0 }
      count.set(glove.color, obj)
    }

    count.set(glove.color, {
      ...obj,
      [glove.hand]: obj[glove.hand] + 1,
    })
  }

  const res = []

  for (const [glove, { L, R }] of count.entries()) {
    for (let i = 0; i < Math.min(L, R); i++) res.push(glove)
  }

  return res
}

const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' },
]

console.log(matchGloves(gloves))
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
]

console.log(matchGloves(gloves2))
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
]

console.log(matchGloves(gloves3))
// []

// type ElfDateTime =
//   `${number}*${number}*${number}@${number}|${number}|${number} NP`

// function timeUntilTakeOff(
//   fromTime: ElfDateTime,
//   takeOffTime: ElfDateTime,
// ): number {
//   const parseTime = (t: string): Date | null => {
//     const regex = /(\d{4})\*(\d{2})\*(\d{2})@(\d{2})\|(\d{2})\|(\d{2}) NP/

//     const match = t.match(regex)
//     if (!match) return null

//     const [, year, month, day, hour, minute, second] = match

//     // parse components to numbers and create a UTC Date
//     return new Date(
//       Date.UTC(
//         Number(year),
//         Number(month) - 1,
//         Number(day),
//         Number(hour),
//         Number(minute),
//         Number(second),
//       ),
//     )
//   }

//   const from = parseTime(fromTime)
//   const to = parseTime(takeOffTime)

//   if (!from || !to) return NaN

//   // return difference in seconds
//   return Math.floor((to.getTime() - from.getTime()) / 1000)
// }

// const takeoff = '2025*12*25@00|00|00 NP'

// // from December 24, 2025, 23:59:30, 30 seconds before takeoff
// console.log(timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff))
// // 30

// // exactly at takeoff time
// console.log(timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff))
// // 0

// // 12 seconds after takeoff
// console.log(timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff))
// // -12

// /**
// function decodeSantaPin(code) {
//   const PIN_LENGTH = 4
//   let lastNumber = 0
//   let res = ''

//   const matches = code.matchAll(/\[(.*?)\]/g)

//   for (const match of matches) {
//     const content = match[1]

//     if (content === '<') {
//       res += lastNumber.toString()
//       continue
//     }

//     let n = Number(content[0])

//     for (let i = 1; i < content.length; i++) {
//       if (content[i] === '+') {
//         n = (n + 1) % 10
//       } else {
//         n = (n - 1 + 10) % 10
//       }
//     }

//     lastNumber = n
//     res += lastNumber.toString()
//   }

//   if (res.length !== PIN_LENGTH) return null

//   return res
// }

// console.log(decodeSantaPin('[1++][2-][3+][<]'))
// // "3144"

// console.log(decodeSantaPin('[9+][0-][4][<]'))
// // "0944"

// console.log(decodeSantaPin('[1+][2-]'))
// // null (only 2 digits)
