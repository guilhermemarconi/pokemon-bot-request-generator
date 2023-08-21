import { signal } from '@preact/signals'
import { useCallback, useMemo } from 'preact/hooks'
import { Form, Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useQuery } from 'react-query'

import Input from '../Input'
import InputGroup from '../InputGroup'
import Button from '../Button'
import ToggleSwitch from '../ToggleSwitch'

import formatRequestText from '../../utils/formatRequestText'
import capitalizeAndRemoveDashes from '../../utils/capitalizeAndRemoveDashes'
import holdItems from '../../utils/getHoldItems'
import getEVSumValues from '../../utils/getEVSumValues'
import slugify from '../../utils/slugify'

import { getAllPokemon, getPokemonData } from '../../services/pokemon'

const MAX_EV_POINTS_TOTAL = 510
const MAX_EV_POINTS_PER_ATTRUBUTE = 252
const moves = signal([])

const CustomForm = ({
  request,
  selectedSpecies,
  speciesData,
  isShiny,
  evPoints,
}) => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      botCharacter: '.',
      teraType: 'Normal',
      nature: 'Adamant',
      ['iv-hp']: 31,
      ['iv-atk']: 31,
      ['iv-def']: 31,
      ['iv-spe']: 31,
      ['iv-sdef']: 31,
      ['iv-satk']: 31,
    }
  })

  const formValues = getValues()

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

  const ensureIvIsValid = useCallback((event) => {
    const { name, value } = event.target
    if (!value || +value < 0) setValue(name, 0)
    if (+value > 31) setValue(name, 31)
  }, [])

  const onChangeEv = useCallback((event) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    const formValues = getValues()
    const evValues = getEVSumValues(formValues)

    if (
      fieldValue > MAX_EV_POINTS_PER_ATTRUBUTE || fieldValue > evPoints.value
    ) {
      if (fieldValue > evPoints.value) {
        setValue(
          fieldName, Math.min(evPoints.value, MAX_EV_POINTS_PER_ATTRUBUTE)
        )
        evPoints.value =
          MAX_EV_POINTS_TOTAL - getEVSumValues(getValues())
        return
      }

      evPoints.value = MAX_EV_POINTS_TOTAL - (evValues - formValues[fieldName])

      setValue(fieldName, Math.min(fieldValue, MAX_EV_POINTS_PER_ATTRUBUTE))

      evPoints.value = evPoints.value - Math.min(
        fieldValue,
        MAX_EV_POINTS_PER_ATTRUBUTE
      )
      return
    }

    evPoints.value = MAX_EV_POINTS_TOTAL - evValues
  }, [
    evPoints.value,
    formValues['ev-hp'],
    formValues['ev-atk'],
    formValues['ev-def'],
    formValues['ev-spe'],
    formValues['ev-sdef'],
    formValues['ev-satk'],
  ])

  const getMaxEvAttr = useCallback((field) => {
    const value = +field.value || 0

    if (!value) return Math.min(
      Math.max(evPoints.value, value), MAX_EV_POINTS_PER_ATTRUBUTE
    )

    if (value > MAX_EV_POINTS_PER_ATTRUBUTE) return MAX_EV_POINTS_PER_ATTRUBUTE

    if (evPoints.value < MAX_EV_POINTS_PER_ATTRUBUTE)
      return evPoints.value + value

    return MAX_EV_POINTS_PER_ATTRUBUTE
  }, [evPoints.value])

  return (
    <Form control={control} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="botCharacter"
        render={
          ({ field }) => (
            <Input.Root>
              <Input.Label
                htmlFor="botCharacter"
                aria-describedby="botCharacterInfo"
              >
                Bot Character
              </Input.Label>

              <Input.Field
                {...field}
                type="select"
                id="botCharacter"
              >
                <option value=".">.</option>
                <option value="$">$</option>
                <option value="*">*</option>
              </Input.Field>

              <Input.Info id="botCharacterInfo">
                Usually is in the name of the bot. E.g.: (*) Alice
              </Input.Info>
            </Input.Root>
          )
        }
      />

      <Controller
        control={control}
        rules={{ required: 'You need to specify a Pokémon.' }}
        name="species"
        render={
          ({ field, formState: { errors } }) => (
            <Input.Root>
              <Input.Label htmlFor="species">Pokémon Species</Input.Label>

              <Input.Field
                {...field}
                id="species"
                autoComplete="off"
                list="allPokemon"
                aria-invalid={errors.species ? "true" : "false"}
                customOnBlur={(event) => {
                  selectedSpecies.value = event.target.value
                }}
              />

              <Input.DataList id="allPokemon" data={allPokemonList?.results} />

              <ErrorMessage
                name="species"
                errors={errors}
                render={({ message }) => (
                  <span
                    role="alert"
                    className="block mt-2 px-2 py-1 text-white text-sm font-semibold bg-red-800 rounded"
                  >
                    {message}
                  </span>
                )}
              />
            </Input.Root>
          )
        }
      />

      <Controller
        control={control}
        name="shiny"
        render={
          ({ field }) => (
            <ToggleSwitch
              {...field}
              label="Shiny"
              id="shiny"
              onClick={() => {
                const newValue = !isShiny.value
                setValue('shiny', newValue)
                isShiny.value = newValue
              }}
            />
          )
        }
      />

      <Controller
        control={control}
        name="item"
        render={
          ({ field }) => (
            <Input.Root>
              <Input.Label htmlFor="item">Held Item</Input.Label>

              <Input.Field
                {...field}
                id="item"
                autoComplete="off"
                list="heldItem"
              />

              <Input.DataList id="heldItem" data={holdItems} />
            </Input.Root>
          )
        }
      />

      <Controller
        control={control}
        name="ability"
        rules={{ required: true }}
        render={
          ({ field }) => (
            <Input.Root>
              <Input.Label htmlFor="Ability">Ability</Input.Label>

              <Input.Field
                {...field}
                type="select"
                id="ability"
                disabled={!pokemonData}
              >
                {abilities.length ? (
                  abilities.map(({ ability: { name }, is_hidden }) => {
                    const formatedName = capitalizeAndRemoveDashes(name)
                    return (
                      <option value={formatedName}>
                        {formatedName} {is_hidden ? '(HA)' : ''}
                      </option>
                    )
                  })
                ) : (
                  <option value="">Set species</option>
                )}
              </Input.Field>
            </Input.Root>
          )
        }
      />

      <Controller
        control={control}
        name="ball"
        render={
          ({ field }) => (
            <Input.Root>
              <Input.Label htmlFor="ball">Ball</Input.Label>

              <Input.Field
                {...field}
                type="select"
                id="ball"
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
              </Input.Field>
            </Input.Root>
          )
        }
      />

      <Controller
        control={control}
        name="teraType"
        render={
          ({ field }) => (
            <Input.Root>
              <Input.Label htmlFor="teraType">Tera Type</Input.Label>

              <Input.Field
                {...field}
                type="select"
                id="teraType"
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
              </Input.Field>
            </Input.Root>
          )
        }
      />

      <Controller
        control={control}
        name="nature"
        render={
          ({ field }) => (
            <Input.Root>
              <Input.Label htmlFor="nature">Nature</Input.Label>

              <Input.Field
                {...field}
                type="select"
                id="nature"
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
              </Input.Field>
            </Input.Root>
          )
        }
      />

      <InputGroup.Root>
        <InputGroup.Label>IVs</InputGroup.Label>

        <InputGroup.Group>
          <Controller
            control={control}
            name="iv-hp"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="iv-hp">HP</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={31}
                    step={1}
                    id="iv-hp"
                    autoComplete="off"
                    customOnBlur={ensureIvIsValid}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="iv-atk"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="iv-atk">Attack</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={31}
                    step={1}
                    id="iv-atk"
                    autoComplete="off"
                    customOnBlur={ensureIvIsValid}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="iv-def"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="iv-def">Defense</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={31}
                    step={1}
                    id="iv-def"
                    autoComplete="off"
                    customOnBlur={ensureIvIsValid}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="iv-spe"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="iv-spe">Speed</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={31}
                    step={1}
                    id="iv-spe"
                    autoComplete="off"
                    customOnBlur={ensureIvIsValid}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="iv-sdef"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="iv-sdef">Special Defense</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={31}
                    step={1}
                    id="iv-sdef"
                    autoComplete="off"
                    customOnBlur={ensureIvIsValid}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="iv-satk"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="iv-satk">Special Attack</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={31}
                    step={1}
                    id="iv-satk"
                    autoComplete="off"
                    customOnBlur={ensureIvIsValid}
                  />
                </Input.Root>
              )
            }
          />
        </InputGroup.Group>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Label>
          EVs{' '}
          (<span className="text-bold">{evPoints.value}</span> points available)
        </InputGroup.Label>

        <InputGroup.Group>
          <Controller
            control={control}
            name="ev-hp"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="ev-hp">HP</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={getMaxEvAttr(field)}
                    step={1}
                    id="ev-hp"
                    autoComplete="off"
                    customOnBlur={onChangeEv}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="ev-atk"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="ev-atk">Attack</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={getMaxEvAttr(field)}
                    step={1}
                    id="ev-atk"
                    autoComplete="off"
                    customOnBlur={onChangeEv}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="ev-def"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="ev-def">Defense</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={getMaxEvAttr(field)}
                    step={1}
                    id="ev-def"
                    autoComplete="off"
                    customOnBlur={onChangeEv}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="ev-spe"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="ev-spe">Speed</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={getMaxEvAttr(field)}
                    step={1}
                    id="ev-spe"
                    autoComplete="off"
                    customOnBlur={onChangeEv}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="ev-sdef"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="ev-sdef">Special Defense</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={getMaxEvAttr(field)}
                    step={1}
                    id="ev-sdef"
                    autoComplete="off"
                    customOnBlur={onChangeEv}
                  />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="ev-satk"
            render={
              ({ field }) => (
                <Input.Root isGoupItem>
                  <Input.Label htmlFor="ev-satk">Special Attack</Input.Label>

                  <Input.Field
                    {...field}
                    type="number"
                    min={0}
                    max={getMaxEvAttr(field)}
                    step={1}
                    id="ev-satk"
                    autoComplete="off"
                    customOnBlur={onChangeEv}
                  />
                </Input.Root>
              )
            }
          />
        </InputGroup.Group>
      </InputGroup.Root>

      <InputGroup.Root>
        <InputGroup.Label>Moves</InputGroup.Label>

        <InputGroup.Group>
          <Controller
            control={control}
            name="move1"
            render={
              ({ field }) => (
                <Input.Root isGroupItem>
                  <Input.Label htmlFor="move1">Move 1</Input.Label>

                  <Input.Field
                    {...field}
                    id="move1"
                    autoComplete="off"
                    list="moves1"
                    placeholder={pokemonData ? 'Move 1' : 'Set species'}
                    disabled={!pokemonData}
                  />

                  <Input.DataList id="moves1" data={moves.value} />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="move2"
            render={
              ({ field }) => (
                <Input.Root isGroupItem>
                  <Input.Label htmlFor="move1">Move 2</Input.Label>

                  <Input.Field
                    {...field}
                    id="move1"
                    autoComplete="off"
                    list="moves2"
                    disabled={!pokemonData}
                  />

                  <Input.DataList id="moves2" data={moves.value} />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="move3"
            render={
              ({ field }) => (
                <Input.Root isGroupItem>
                  <Input.Label htmlFor="move1">Move 3</Input.Label>

                  <Input.Field
                    {...field}
                    id="move1"
                    autoComplete="off"
                    list="moves3"
                    disabled={!pokemonData}
                  />

                  <Input.DataList id="moves3" data={moves.value} />
                </Input.Root>
              )
            }
          />

          <Controller
            control={control}
            name="move4"
            render={
              ({ field }) => (
                <Input.Root isGroupItem>
                  <Input.Label htmlFor="move1">Move 4</Input.Label>

                  <Input.Field
                    {...field}
                    id="move1"
                    autoComplete="off"
                    list="moves4"
                    disabled={!pokemonData}
                  />

                  <Input.DataList id="moves4" data={moves.value} />
                </Input.Root>
              )
            }
          />
        </InputGroup.Group>
      </InputGroup.Root>

      <Button type="submit">Generate</Button>
    </Form>
  )
}

export default CustomForm
