import { forwardRef, useCallback } from 'preact/compat'

const ToggleSwitch = forwardRef(({
  label = null,
  id = null,
  onClick = () => null,
  ...props
}, ref) => {
  const isPressed = props.value

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

      <button
        {...props}
        ref={ref}
        id={id}
        type="button"
        className={
          `${props.className || ''} group relative flex gap-2 mt-1 p-1 rounded bg-red-200 aria-pressed:bg-sky-200 outline-red-800 aria-pressed:outline-cyan-600 transition-colors`
            .replace(/\s+/g, ' ').trim()
        }
        aria-pressed={isPressed}
        aria-label={isPressed ? 'Pokémon is shiny' : 'Pokémon is not shiny'}
        onClick={useCallback(onClick)}
      >
        <span
          className="relative z-10 py-2 px-3 font-bold text-xs text-white group-aria-pressed:text-black uppercase rounded bg-red-500 group-aria-pressed:bg-transparent transition-colors"
          aria-hidden={true}
        >
          No
        </span>

        <span
          className="relative z-10 py-2 px-3 font-bold text-xs text-black group-aria-pressed:text-white uppercase rounded bg-transparent group-aria-pressed:bg-sky-500 transition-colors"
          aria-hidden={true}
        >
          Yes
        </span>
      </button>
    </fieldset>
  )
})

ToggleSwitch.displayName = 'ToggleSwitch'

export default ToggleSwitch
