const Info = ({ children, ...props }) => {
  return (
    <span {...props} className="block mt-1 text-sm text-slate-400">
      {children}
    </span>
  )
}

export default Info
