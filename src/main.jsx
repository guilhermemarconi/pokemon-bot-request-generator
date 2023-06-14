import { render } from 'preact'
import { inject } from '@vercel/analytics'
import { App } from './app.jsx'

import './index.css'

render(<App />, document.getElementById('app'))
inject()
