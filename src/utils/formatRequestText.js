import getSpeciesRequestName from './getSpeciesRequestName'

const getIVString = (attributes) => {
  let output = 'IVs: '
  output += Object.entries(attributes)
    .filter(([_, value]) => typeof +value === 'number' && !isNaN(+value))
    .map(([attribute, value]) => `${value} ${attribute}`)
    .join(' / ')
  return output
}

const getEVString = (attributes) => {
  let output = 'EVs: '
  output += Object.entries(attributes)
    .filter(([_, value]) => typeof +value === 'number' && value > 0)
    .map(([attribute, value]) => `${value} ${attribute}`)
    .join(' / ')
  return output
}

const formatRequestText = (data) => {
  const lines = [
    `${data.botCharacter}trade ${getSpeciesRequestName(data.species)}`,
  ]

  if (data.gender) lines[0] += ` (${data.gender})`
  if (data.item) lines[0] += ` @ ${data.item}`
  if (data.shiny) lines.push(`Shiny: Yes`)
  if (data.ability) lines.push(`Ability: ${data.ability}`)
  if (data.teraType) lines.push(`Tera Type: ${data.teraType}`)
  if (data.ball) lines.push(`Ball: ${data.ball}`)
  if (
    data['iv-hp'] ||
    data['iv-atk'] ||
    data['iv-def'] ||
    data['iv-spe'] ||
    data['iv-sdef'] ||
    data['iv-satk']
  ) {
    lines.push(getIVString({
      HP: data['iv-hp'],
      Atk: data['iv-atk'],
      Def: data['iv-def'],
      Spe: data['iv-spe'],
      SDef: data['iv-sdef'],
      SAtk: data['iv-satk'],
    }))
  }
  if (
    data['ev-hp'] ||
    data['ev-atk'] ||
    data['ev-def'] ||
    data['ev-spe'] ||
    data['ev-sdef'] ||
    data['ev-satk']
  ) {
    lines.push(getEVString({
      HP: data['ev-hp'],
      Atk: data['ev-atk'],
      Def: data['ev-def'],
      Spe: data['ev-spe'],
      SDef: data['ev-sdef'],
      SAtk: data['ev-satk'],
    }))
  }
  lines.push(`${data.nature} Nature`)
  if (data.move1) lines.push(`- ${data.move1}`)
  if (data.move2) lines.push(`- ${data.move2}`)
  if (data.move3) lines.push(`- ${data.move3}`)
  if (data.move4) lines.push(`- ${data.move4}`)

  return lines.join('\r\n')
}

export default formatRequestText
