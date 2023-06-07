import { useCallback } from 'preact/hooks'
import { signal } from '@preact/signals'

import CopyToClipboard from 'react-copy-to-clipboard'

import Button from '../Button'

const DEFAULT_COPY_BUTTON_LABEL = 'Copy generated text'
const copyButtonLabel = signal(DEFAULT_COPY_BUTTON_LABEL)

const RequestText = ({ text }) => {
  if (!text) return null

  const handleClick = useCallback(() => {
    copyButtonLabel.value = 'Copied!'
    setTimeout(() => {
      copyButtonLabel.value = DEFAULT_COPY_BUTTON_LABEL
    }, 3000)
  }, [])

  return (
    <div className="sticky top-0">
      <pre
        className="request-text p-3 bg-slate-100 rounded-t-xl"
      >
        {text}
      </pre>

      <CopyToClipboard text={text}>
        <Button
          variant="copy"
          onClick={handleClick}
        >
          {copyButtonLabel.value}
        </Button>
      </CopyToClipboard>
    </div>
  )
}

export default RequestText
