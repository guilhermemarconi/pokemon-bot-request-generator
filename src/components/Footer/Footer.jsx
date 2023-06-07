const Footer = () => {
  return (
    <footer
      className="px-5 py-8 bg-slate-200"
    >
      <p className="mb-2 text-xs text-center">
        Made with love <strike className="text-slate-500">and a PokéBall</strike> ❤️
      </p>
      <p className="flex justify-center gap-2 font-mono text-xs">
        <a
          className="underline"
          href="https://github.com/guilhermemarconi/pokemon-bot-request-generator"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          Github
        </a>
        <span aria-hidden="true">|</span>
        <a
          className="underline"
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PokéAPI"
        >
          PokéAPI
        </a>
        <span aria-hidden="true">|</span>
        <a
          className="underline"
          href="https://bmc.link/marconi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy me a coffee"
        >
          Buy me a coffee
        </a>
      </p>
    </footer>
  )
}

export default Footer
