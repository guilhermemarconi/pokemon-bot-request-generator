import capitalizeAndRemoveDashes from '../../utils/capitalizeAndRemoveDashes'

const DataList = ({ id, data }) => {
  return (
    <datalist id={id}>
      {(data || []).map(({ name }) => (
        <option
          key={`${id}_${name}`}
          value={capitalizeAndRemoveDashes(name)}
        >
          {capitalizeAndRemoveDashes(name)}
        </option>
      ))}
    </datalist>
  )
}

export default DataList
