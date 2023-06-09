import { signal } from '@preact/signals'
import { useCallback, useMemo } from 'preact/hooks'
import { Form, Controller, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

import Input from '../Input'
import Button from '../Button'
// import CompleteFormFields from '../CompleteFormFields'

import formatRequestText from '../../utils/formatRequestText'
import capitalizeAndRemoveDashes from '../../utils/capitalizeAndRemoveDashes'
import slugify from '../../utils/slugify'

import { getAllPokemon, getPokemonData } from '../../services/pokemon'

const moves = signal([])

const CustomForm = ({
  // formType,
  request,
  selectedSpecies,
  speciesData,
  isShiny,
}) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      botCharacter: '.',
      item: 'Shell Bell',
      ball: 'Poké Ball',
      teraType: 'Normal',
      nature: 'Adamant',
    }
  })

  const { data: allPokemonList } = useQuery('allPokemon', getAllPokemon)
  const { data: pokemonData } = useQuery(
    ['pokemon', selectedSpecies.value],
    async () => {
      const data = await getPokemonData(slugify(selectedSpecies.value))
      speciesData.value = data
      moves.value = data.moves.map(({ move: { name } }) => ({ name }))
      setValue(
        'ability',
        capitalizeAndRemoveDashes(data.abilities[0].ability.name)
      )
      setValue(
        'teraType',
        capitalizeAndRemoveDashes(data.types[0].type.name)
      )
      return data
    },
    { enabled: !!selectedSpecies.value }
  )

  const abilities = useMemo(() => {
    if (!pokemonData) return []

    return pokemonData.abilities.filter(({ ability: { name } }, index) =>
      pokemonData.abilities.findIndex(
        (item) => item.ability.name === name
      ) === index
    )
  }, [pokemonData?.name])

  const onSubmit = useCallback((data) => {
    request.value = formatRequestText(data)
  }, [])

  // console.error(errors)

  return (
    <Form control={control} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="botCharacter"
        render={
          ({ field }) => (
            <Input
              type="select"
              label="Bot Character"
              id="botCharacter"
              info="Usually is in the name of the bot. E.g.: ($) Alice"
              {...field}
            >
              <option value=".">.</option>
              <option value="$">$</option>
              <option value="*">*</option>
            </Input>
          )
        }
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name="species"
        render={
          ({ field }) => (
            <Input
              label="Pokémon Species"
              id="species"
              autoComplete="off"
              datalist="allPokemon"
              listData={allPokemonList?.results}
              customOnBlur={(event) => {
                selectedSpecies.value = event.target.value
              }}
              {...field}
            />
          )
        }
      />

      <Controller
        control={control}
        name="item"
        render={
          ({ field }) => (
            <Input
              label="Item"
              id="item"
              autoComplete="off"
              {...field}
            />
          )
        }
      />

      <Controller
        control={control}
        name="ability"
        rules={{ required: true }}
        render={
          ({ field }) => (
            <Input
              type="select"
              label="Ability"
              id="ability"
              disabled={!pokemonData}
              {...field}
            >
              {abilities.length ? (
                abilities.map(({ ability: { name }, is_hidden }) => {
                  const formatedName = capitalizeAndRemoveDashes(name)
                  return (
                    <option value={formatedName}>{formatedName} {is_hidden ? '(HA)' : ''}</option>
                  )
                })
              ) : (
                <option value="">Set species</option>
              )}
            </Input>
          )
        }
      />

      <Controller
        control={control}
        name="ball"
        render={
          ({ field }) => (
            <Input
              type="select"
              label="Ball"
              id="ball"
              {...field}
            >
              <option value=""></option>
              <option value="Poké Ball">Poké Ball</option>
              <option value="Great Ball">Great Ball</option>
              <option value="Ultra Ball">Ultra Ball</option>
              <option value="Premier Ball">Premier Ball</option>
              <option value="Dive Ball">Dive Ball</option>
              <option value="Heal Ball">Heal Ball</option>
              <option value="Luxury Ball">Luxury Ball</option>
              <option value="Dusk Ball">Dusk Ball</option>
              <option value="Repeat Ball">Repeat Ball</option>
              <option value="Net Ball">Net Ball</option>
              <option value="Nest Ball">Nest Ball</option>
              <option value="Quick Ball">Quick Ball</option>
              <option value="Timer Ball">Timer Ball</option>
              <option value="Dream Ball">Dream Ball</option>
              <option value="Fast Ball">Fast Ball</option>
              <option value="Heavy Ball">Heavy Ball</option>
              <option value="Friend Ball">Friend Ball</option>
              <option value="Moon Ball">Moon Ball</option>
              <option value="Lure Ball">Lure Ball</option>
              <option value="Love Ball">Love Ball</option>
              <option value="Level Ball">Level Ball</option>
              <option value="Master Ball">Master Ball</option>
              <option value="Cherish Ball">Cherish Ball</option>
            </Input>
          )
        }
      />

      <Controller
        control={control}
        name="teraType"
        render={
          ({ field }) => (
            <Input
              type="select"
              label="Tera Type"
              id="teraType"
              {...field}
            >
              <option value="Normal">Normal</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              <option value="Flying">Flying</option>
              <option value="Electric">Electric</option>
              <option value="Fighting">Fighting</option>
              <option value="Psychic">Psychic</option>
              <option value="Bug">Bug</option>
              <option value="Ghost">Ghost</option>
              <option value="Dark">Dark</option>
              <option value="Rock">Rock</option>
              <option value="Ground">Ground</option>
              <option value="Ice">Ice</option>
              <option value="Steel">Steel</option>
              <option value="Fairy">Fairy</option>
              <option value="Poison">Poison</option>
              <option value="Dragon">Dragon</option>
            </Input>
          )
        }
      />

      <Controller
        control={control}
        name="shiny"
        render={
          ({ field }) => (
            <Input
              type="checkbox"
              label="Shiny"
              id="shiny"
              customOnChange={() => {
                const newValue = !isShiny.value
                setValue('shiny', newValue)
                isShiny.value = newValue
              }}
              {...field}
            />
          )
        }
      />

      <Controller
        control={control}
        name="nature"
        render={
          ({ field }) => (
            <Input
              type="select"
              label="Nature"
              id="nature"
              {...field}
            >
              <option value="Adamant">Adamant</option>
              <option value="Bashful">Bashful</option>
              <option value="Bold">Bold</option>
              <option value="Brave">Brave</option>
              <option value="Calm">Calm</option>
              <option value="Careful">Careful</option>
              <option value="Docile">Docile</option>
              <option value="Gentle">Gentle</option>
              <option value="Hardy">Hardy</option>
              <option value="Hasty">Hasty</option>
              <option value="Impish">Impish</option>
              <option value="Jolly">Jolly</option>
              <option value="Lax">Lax</option>
              <option value="Lonely">Lonely</option>
              <option value="Mild">Mild</option>
              <option value="Modest">Modest</option>
              <option value="Naive">Naive</option>
              <option value="Naughty">Naughty</option>
              <option value="Quiet">Quiet</option>
              <option value="Quirky">Quirky</option>
              <option value="Rash">Rash</option>
              <option value="Relaxed">Relaxed</option>
              <option value="Sassy">Sassy</option>
              <option value="Serious">Serious</option>
              <option value="Timid">Timid</option>
            </Input>
          )
        }
      />

      <Controller
        control={control}
        name="move1"
        render={
          ({ field }) => (
            <Input
              label="Moves"
              id="move1"
              autoComplete="off"
              datalist="moves1"
              listData={moves.value}
              placeholder={pokemonData ? 'Move 1' : 'Set species'}
              disabled={!pokemonData}
              {...field}
            />
          )
        }
      />

      <Controller
        control={control}
        name="move2"
        render={
          ({ field }) => (
            <Input
              id="move2"
              autoComplete="off"
              datalist="moves2"
              listData={moves.value}
              placeholder={pokemonData ? 'Move 2' : ''}
              disabled={!pokemonData}
              {...field}
            />
          )
        }
      />

      <Controller
        control={control}
        name="move3"
        render={
          ({ field }) => (
            <Input
              id="move3"
              autoComplete="off"
              datalist="moves3"
              listData={moves.value}
              placeholder={pokemonData ? 'Move 3' : ''}
              disabled={!pokemonData}
              {...field}
            />
          )
        }
      />

      <Controller
        control={control}
        name="move4"
        render={
          ({ field }) => (
            <Input
              id="move4"
              autoComplete="off"
              datalist="moves4"
              listData={moves.value}
              placeholder={pokemonData ? 'Move 4' : ''}
              disabled={!pokemonData}
              {...field}
            />
          )
        }
      />

      {/* {formType.value === 'complete' ? (
        <CompleteFormFields control={control}/>
      ) : null} */}

      <Button type="submit">Generate</Button>
    </Form>
  )
}

export default CustomForm
