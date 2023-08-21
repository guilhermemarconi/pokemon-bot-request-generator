const edgeCases = {
  // pokemon names
  'jangmo-o': 'Jangmo-O',
  'hakamo-o': 'Hakamo-O',
  'kommo-o': 'Kommo-O',
  'mr-mime-galar': 'Mr. Mime Galar',
  'mr-rime': 'Mr. Rime',

  // items
  'Heavy-Duty Boots': 'Heavy-Duty Boots',
  'Never-Melt Ice': 'Never-Melt Ice',
}

const capitalizeAndRemoveDashes = (str) => {
  if (edgeCases[str]) return edgeCases[str]

  const arr = str.split(/\s|-/);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

export default capitalizeAndRemoveDashes
