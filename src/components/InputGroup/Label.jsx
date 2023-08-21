const Label = ({ children, ...props }) => {
  return (
    <legend {...props}>
      {children}
    </legend>
  )
}

export default Label
