const Label = ({ htmlFor, children, ...props }) => {
  return (
    <label {...props} htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label
