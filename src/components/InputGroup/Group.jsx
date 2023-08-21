const Group = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
      {children.map((child) => (
        <div
          key={child.key}
          className="flex-grow"
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export default Group
