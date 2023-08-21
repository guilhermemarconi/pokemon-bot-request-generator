import { forwardRef, useMemo } from 'preact/compat'

const getElementByType = (type) => {
  switch (type) {
    case 'select':
      return 'select'
    default:
      return 'input'
  }
}

const Field = forwardRef(({
  type = 'text',
  id = null,
  onChange = () => null,
  onBlur = () => null,
  customOnChange = () => null,
  customOnBlur = () => null,
  ...props
}, ref) => {
  if (['checkbox', 'radio', 'range'].includes(type)) return null

  const styleClasses = useMemo(() => {
    const classList = 'block w-full h-10 border rounded-md mt-1 px-2 py-1 focus:ring text-lg aria-invalid:text-red-800 aria-invalid:ring-2 aria-invalid:ring-red-800 selection:text-white selection:bg-red-600'.split(' ')
    if (props.className) classList.push('className')
    return classList.join(' ')
  }, [props.className])

  const FieldElement = getElementByType(type)
  const elementProps = {
    className: styleClasses,
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

  return (
    <FieldElement
      {...elementProps}
      {...props}
    />
  )
})

Field.displayName = 'Field'

export default Field
