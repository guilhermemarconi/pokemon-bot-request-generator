const PokemonImage = ({ pokemonName, isShiny, sprites }) => {
  const officialArtworks = sprites?.other?.['official-artwork']

  if (!officialArtworks) return null
  if (!isShiny && !officialArtworks.front_default) return null
  if (isShiny && !officialArtworks.front_shiny) return null

  const imageUrl =
    isShiny
      ? officialArtworks.front_shiny
      : officialArtworks.front_default

  const altText = `${isShiny ? 'Shiny ' : ''}${pokemonName} artwork.`

  return (
    <img
      src={imageUrl}
      alt={altText}
      width={320}
      height={320}
      className="block w-full md:w-80 h-auto mb-4"
    />
  )
}

export default PokemonImage
