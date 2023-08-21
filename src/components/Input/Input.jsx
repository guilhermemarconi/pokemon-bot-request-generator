import { Fragment, forwardRef } from 'preact/compat'

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
  isGoupItem = false,
  ...props
}, ref) => {
  if (['checkbox', 'radio', 'range'].includes(type)) return null

  const styleClasses = 'block w-full h-10 border rounded-md mt-1 px-2 py-1 focus:ring text-lg'

  const Element = getElementByType(type)
  const elementProps = {
    className: `${styleClasses} ${isGoupItem ? '' : 'md:w-60'}`,
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

  if (['checkbox', 'radio'].includes(type)) return null

  if (type !== 'select') elementProps.type = type
  if (datalist) elementProps.list = datalist

  const InputElement = isGoupItem ? Fragment : 'fieldset'

  return (
    <InputElement className={isGoupItem ? null : 'my-3'}>
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
    </InputElement>
  )
})

Input.displayName = 'Input'

export default Input
