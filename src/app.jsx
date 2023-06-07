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

export function App() {
  return (
    <>
      <main className="w-full max-w-3xl mx-auto flex-1">
        <div className="px-5 lg:px-8">
          <h1 className="font-extrabold text-2xl lg:text-4xl text-center my-5">
            Pokémon Bot Request Generator
          </h1>

          {/* <FormTypeSelect formType={formType} /> */}

          <section className="md:flex md:justify-between md:gap-4 lg:gap-5">
            <div className="lg:grow">
              <QueryClientProvider client={queryClient}>
                <Form
                  formType={formType}
                  request={request}
                  selectedSpecies={selectedSpecies}
                  speciesData={speciesData}
                  isShiny={isShiny}
                />
              </QueryClientProvider>
            </div>

            <div className="pb-5">
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
