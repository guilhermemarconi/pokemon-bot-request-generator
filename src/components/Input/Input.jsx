import { forwardRef } from 'preact/compat'

import capitalizeAndRemoveDashes from '../../utils/capitalizeAndRemoveDashes'

const getElementByType = (type) => {
  switch (type) {
    case 'select':
      return 'select'
    default:
      return 'input'
  }
}

const Input = forwardRef(({
  type = 'text',
  label = null,
  id = null,
  onChange = () => null,
  onBlur = () => null,
  customOnChange = () => null,
  customOnBlur = () => null,
  datalist,
  listData,
  info,
  ...props
}, ref) => {
  if (['checkbox', 'radio', 'range'].includes(type)) return null

  const Element = getElementByType(type)
  const elementProps = {
    className: "block w-full md:w-60 h-10 border rounded-md mt-1 px-2 py-1 focus:ring text-lg",
    ref,
    id,
    onChange: (event) => {
      onChange(event)
      customOnChange(event)
    },
    onBlur: (event) => {
      onBlur(event)
      customOnBlur(event)
    }
  }

  if (type !== 'select') elementProps.type = type
  if (datalist) elementProps.list = datalist

  return (
    <fieldset className="my-3">
      {
        (label && id)
          ? (
            <label
              htmlFor={id}
              className=""
            >
              {label}
            </label>
          )
          : null
      }

      <Element
        {...elementProps}
        {...props}
      />

      {info ? (
        <span className="block mt-1 text-sm text-slate-400">
          {info}
        </span>
      ) : null}

      {datalist && listData ? (
        <datalist id={datalist}>
          {(listData || []).map(({ name }) => (
            <option
              key={`${datalist}_${name}`}
              value={capitalizeAndRemoveDashes(name)}
            >
              {capitalizeAndRemoveDashes(name)}
            </option>
          ))}
        </datalist>
      ) : null}
    </fieldset>
  )
})

export default Input
