# Pokémon bot request generator

This project is nothing but a form that helps people to generate the text that will be sent to bots that will trade the requested pokémon with them.

## Technologies used

- [Vite](https://vitejs.dev/)
- [Preact](https://preactjs.com/)
- [Tailwind](https://tailwindcss.com/)
- [PokéAPI](https://pokeapi.co/)

## Implementation roadmap

### Form fields

- [x] Pokémon species
- [x] Bot starting character
- [x] Held item
- [x] Ability ([needs improvement](https://github.com/guilhermemarconi/pokemon-bot-request-generator/issues/7))
- [x] Ball
- [x] Tera type
- [x] Nature
- [x] Moves
- [ ] IVs
- [ ] EVs
- [ ] Shiny
- [ ] Trainer data  
(OT, OT gender, TID and SID)
- [ ] Ribbons
- [ ] Encounter data  
(met day, met month, met year, met location and met level)
- [ ] Egg data  
(is egg, egg day, egg month, egg year, egg location(?))
- [ ] Size, weight and scalar
- [ ] Friendship amount
- [ ] HyperTraining flags amount

### General rules

- [ ] Disallow setting ball on hisuian species
- [ ] Disallow setting level and ribbon on eggs
- [ ] Verify if eggs must have only picnic location (and disallow setting it if it does)

## Contributing with the project

If you want to report a bug or contribute with this project, read [CONTRIBUTING.md](https://github.com/guilhermemarconi/pokemon-bot-request-generator/blob/main/CONTRIBUTING.md) file. It'll guide you through this process.

### Known bugs

See [issues page](https://github.com/guilhermemarconi/pokemon-bot-request-generator/issues?q=is%3Aopen+is%3Aissue+label%3Abug).

---

Pokémon and Pokémon character names are trademarks of Nintendo.
