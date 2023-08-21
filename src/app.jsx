import { signal } from '@preact/signals'
import { QueryClient, QueryClientProvider } from 'react-query'

// import FormTypeSelect from './components/FormTypeSelect'
import Form from './components/Form'
import PokemonImage from './components/PokemonImage'
import RequestText from './components/RequestText'
import Footer from './components/Footer'

const queryClient = new QueryClient()

const formType = signal('simple')
const selectedSpecies = signal(null)
const speciesData = signal(null)
const isShiny = signal(false)
const request = signal('')
const evPoints = signal(510)

export function App() {
  return (
    <>
      <main className="w-full max-w-3xl mx-auto flex-1">
        <div className="px-5 lg:px-8">
          <h1 className="font-extrabold text-2xl lg:text-4xl text-center my-5">
            Pokémon Bot Request Generator
          </h1>

          {/* <FormTypeSelect formType={formType} /> */}

          <section
            className="md:flex md:justify-between md:gap-6 lg:gap-8 md:pb-8"
          >
            <div className="flex-1 lg:grow">
              <QueryClientProvider client={queryClient}>
                <Form
                  formType={formType}
                  request={request}
                  selectedSpecies={selectedSpecies}
                  speciesData={speciesData}
                  isShiny={isShiny}
                  evPoints={evPoints}
                />
              </QueryClientProvider>
            </div>

            <div className="flex-1 pb-5">
              <PokemonImage
                pokemonName={speciesData.value?.name}
                isShiny={isShiny.value}
                sprites={speciesData.value?.sprites}
              />
              <RequestText text={request.value} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
