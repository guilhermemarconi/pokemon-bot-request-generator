import { Controller } from 'react-hook-form'

import Input from '../Input'

const CompleteFormFields = ({ control }) => (
  <>
    <Controller
      control={control}
      name="gender"
      render={
        ({ field }) => (
          <Input
            type="select"
            label="Gender"
            id="gender"
            {...field}
          >
            <option></option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Input>
        )
      }
    />
  </>
)

export default CompleteFormFields
