import { forwardRef, useMemo } from 'preact/compat'

const DEFAULT_CLASSES = 'block px-8 py-4 font-semibold text-white bg-sky-400 lg:hover:bg-sky-500 lg:active:bg-sky-600 lg:active:ring lg:focus:ring'

const getVariantStyle = (variant) => {
  switch (variant) {
    case 'copy':
      return 'block w-full rounded-b-md'

    default:
      return 'rounded-md'
  }
}

const Button = forwardRef(({
  children,
  className,
  variant = 'submit',
  ...props
}, ref) => {
  const computedClasses = useMemo(() => {
    const variantClasses = getVariantStyle(variant)
    return variantClasses
  }, [variant])

  return (
    <button
      className={
        `${className || ''} ${DEFAULT_CLASSES} ${computedClasses}`.trim()
      }
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
