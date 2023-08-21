import { Fragment, useMemo } from 'preact/compat'

const Root = ({
  isGroupItem,
  children,
  ...props
}) => {
  const RootElement = isGroupItem ? Fragment : 'fieldset'

  const styleClasses = useMemo(() => {
    const classList = []
    if (props.className) classList.push(props.className)
    if (!isGroupItem) classList.push('my-3')
    return classList.join(' ')
  }, [props.className])

  return (
    <RootElement
      {...props}
      className={styleClasses}
    >
      {children}
    </RootElement>
  )
}

export default Root
