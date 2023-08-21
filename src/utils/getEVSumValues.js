const getEVSumValues = (formValues) => (
  +(formValues['ev-hp'] || 0) +
  +(formValues['ev-atk'] || 0) +
  +(formValues['ev-def'] || 0) +
  +(formValues['ev-spe'] || 0) +
  +(formValues['ev-sdef'] || 0) +
  +(formValues['ev-satk'] || 0)
)

export default getEVSumValues
