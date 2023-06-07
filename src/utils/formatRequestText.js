/**
 * *trade Appletun @ Shell Bell
 * Ability: Thick Fat
 * Shiny: No 
 * Tera Type: Grass
 * Ball: Friend Ball
 * EVs: 252 HP / 252 SAtk / 6 Spe
 * Modest Nature
 * - Apple Acid
 */

const formatRequestText = (data) => {
  const lines = [
    `${data.botCharacter}trade ${data.species}`,
    `Ball: ${data.ball}`,
  ]

  if (data.item) lines[0] += ` @ ${data.item}`
  if (data.shiny) lines.push(`Shiny: Yes`)
  if (data.ability) lines.push(`Ability: ${data.ability}`)
  if (data.teraType) lines.push(`Tera Type: ${data.teraType}`)
  lines.push(`${data.nature} Nature`)
  if (data.move1) lines.push(`- ${data.move1}`)
  if (data.move2) lines.push(`- ${data.move2}`)
  if (data.move3) lines.push(`- ${data.move3}`)
  if (data.move4) lines.push(`- ${data.move4}`)

  return lines.join('\r\n')
}

export default formatRequestText
