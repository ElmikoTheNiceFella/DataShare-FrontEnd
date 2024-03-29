// Convert file names and codes to a JSON file for ease of use
import fs from 'node:fs'
fs.readFile('FlagsNamesAndCodes.txt', function(err, data) {
  if (err) console.log(err.message)
  const flags = data.
    toString().
    split(/\n+|\r+/ig)
    .filter(v => v && v != "IC" && v != "NY" && v != "XK")
  let obj = {}
  const dontInclude = [
  'BL', 'GP', 'SJ',
  'UM', 'BV', 'HM',
  'PM', 'IO', 'BQ',
  'GF', 'SX'
]
  for(let i = 0; i < flags.length; i+=2) {
    if (!dontInclude.includes(flags[i]))
      obj[flags[i]] = flags[i+1]
  }
  fs.writeFile('flagData.json', JSON.stringify(obj), function(err) {
    if (err) console.log(err.message)
    console.log("File created!")
  })
})