import { Field, TextField } from "components"
import { IoPhonePortraitOutline } from "react-icons/io5"

export function FormEnterPhone() {
  return (
    <Field
      name="phone"
      component={
        <TextField
          type="number"
          placeholder="Số điện thoại"
          before={<IoPhonePortraitOutline fontSize="18" />}
        />
      }
    />
  )
}
