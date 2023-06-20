const speciesMap = {
  'Rattata Alola': 'Rattata-Alola',
  'Raticate Alola': 'Raticate-Alola',
  'Raichu Alola': 'Raichu-Alola',
  'Sandshrew Alola': 'Sandshrew-Alola',
  'Sandslash Alola': 'Sandslash-Alola',
  'Vulpix Alola': 'Vulpix-Alola',
  'Ninetales Alola': 'Ninetales-Alola',
  'Diglett Alola': 'Diglett-Alola',
  'Dugtrio Alola': 'Dugtrio-Alola',
  'Meowth Alola': 'Meowth-Alola',
  'Persian Alola': 'Persian-Alola',
  'Geodude Alola': 'Geodude-Alola',
  'Graveler Alola': 'Graveler-Alola',
  'Golem Alola': 'Golem-Alola',
  'Grimer Alola': 'Grimer-Alola',
  'Muk Alola': 'Muk-Alola',
  'Exeggutor Alola': 'Exeggutor-Alola',
  'Marowak Alola': 'Marowak-Alola',
  'Meowth Galar': 'Meowth-Galar',
  'Ponyta Galar': 'Ponyta-Galar',
  'Rapidash Galar': 'Rapidash-Galar',
  'Slowpoke Galar': 'Slowpoke-Galar',
  'Slowbro Galar': 'Slowbro-Galar',
  'Farfetchd Galar': 'Farfetch\'d-Galar',
  'Weezing Galar': 'Weezing-Galar',
  'Mr. Mime Galar': 'Mr. Mime-Galar',
  'Articuno Galar': 'Articuno-Galar',
  'Zapdos Galar': 'Zapdos-Galar',
  'Moltres Galar': 'Moltres-Galar',
  'Slowking Galar': 'Slowking-Galar',
  'Corsola Galar': 'Corsola-Galar',
  'Zigzagoon Galar': 'Zigzagoon-Galar',
  'Linoone Galar': 'Linoone-Galar',
  'Darumaka Galar': 'Darumaka-Galar',
  'Darmanitan Galar Standard': 'Darmanitan-Galar',
  'Darmanitan Galar Zen': 'Darmanitan-Galar',
  'Yamask Galar': 'Yamask-Galar',
  'Growlithe Hisui': 'Growlithe-Hisui',
  'Arcanine Hisui': 'Arcanine-Hisui',
  'Voltorb Hisui': 'Voltorb-Hisui',
  'Electrode Hisui': 'Electrode-Hisui',
  'Typhlosion Hisui': 'Typhlosion-Hisui',
  'Quilfish Hisui': 'Quilfish-Hisui',
  'Sneasel Hisui': 'Sneasel-Hisui',
  'Samurott Hisui': 'Samurott-Hisui',
  'Lilligant Hisui': 'Lilligant-Hisui',
  'Zorua Hisui': 'Zorua-Hisui',
  'Zoroark Hisui': 'Zoroark-Hisui',
  'Braviary Hisui': 'Braviary-Hisui',
  'Sliggoo Hisui': 'Sliggoo-Hisui',
  'Goodra Hisui': 'Goodra-Hisui',
  'Avalugg Hisui': 'Avalugg-Hisui',
  'Decidueye Hisui': 'Decidueye-Hisui',
  'Tauros Paldea Combat Breed': 'Tauros-Paldea-Combat',
  'Tauros Paldea Blaze Breed': 'Tauros-Paldea-Blaze',
  'Tauros Paldea Aqua Breed': 'Tauros-Paldea-Aqua',
  'Wooper Paldea': 'Wooper-Paldea',
  'Giratina Altered': 'Giratina',
  'Giratina Origin': 'Giratina',
  'Darmanitan Standard': 'Darmanitan',
  'Tornadus Incarnate': 'Tornadus',
  'Thundurus Incarnate': 'Thundurus',
  'Landorus Incarnate': 'Landorus',
  'Enamorus Incarnate': 'Enamorus',
  'Meowstick Male': 'Meowstick',
  'Meowstick Female': 'Meowstick',
  'Aegislash Shield': 'Aegislash',
  'Aegislash Blade': 'Aegislash',
  'Pumpkaboo Average': 'Pumpkaboo',
  'Pumpkaboo Small': 'Pumpkaboo',
  'Pumpkaboo Large': 'Pumpkaboo',
  'Pumpkaboo Super': 'Pumpkaboo',
  'Oricorio Baile': 'Oricorio-Baile',
  'Oricorio Pom Pom': 'Oricorio-Pom-Pom',
  'Oricorio Pau': 'Oricorio-Pau',
  'Oricorio Sensu': 'Oricorio-Sensu',
  'Mimikyu Disgised': 'Mimikyu',
  'Mimikyu Busted': 'Mimikyu',
  'Urshifu Single Strike': 'Urshifu-Single-Strike',
  'Urshifu Rapid Strike': 'Urshifu-Rapid-Strike',
  'Wo Chien': 'Wo-Chien',
  'Chien Pao': 'Chien-Pao',
  'Ting Lu': 'Ting-Lu',
  'Chi Yu': 'Chi-Yu',
  'Pikachu Original Cap': 'Pikachu-Original',
  'Pikachu Hoenn Cap': 'Pikachu-Hoenn',
  'Pikachu Kalos Cap': 'Pikachu-Kalos',
  'Pikachu World Cap': 'Pikachu-World',
  'Pikachu Sinnoh Cap': 'Pikachu-Sinnoh',
  'Pikachu Unova Cap': 'Pikachu-Unova',
  'Pikachu Alola Cap': 'Pikachu-Alola',
  'Pikachu Partner Cap': 'Pikachu-Partner',
}

const getSpeciesRequestName = (species) => speciesMap[species] || species

export default getSpeciesRequestName
