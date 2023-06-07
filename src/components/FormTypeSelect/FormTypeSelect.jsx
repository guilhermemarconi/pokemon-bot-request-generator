import { useCallback } from 'preact/hooks'

const baseClasses = "flex-1 px-2 py-1 border border-collapse aria-pressed:bg-sky-500 aria-pressed:text-white aria-pressed:font-bold first:rounded-s last:rounded-e"

const FormTypeSelect = ({ formType }) => {
  const handleClick = useCallback((value) => {
    formType.value = value
  }, [formType.value])
  
  return (
    <div className="flex w-full md:w-auto mx-auto">
      <button
        className={baseClasses}
        aria-pressed={formType.value === 'simple'}
        onClick={() => handleClick('simple')}
      >
        Simple form
      </button>
      <button
        className={baseClasses}
        aria-pressed={formType.value === 'complete'}
        onClick={() => handleClick('complete')}
      >
        Complete form
      </button>
    </div>
  )
}

export default FormTypeSelect
