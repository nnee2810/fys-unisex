import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import { ReactElement } from "react"
import { Color } from "styles/theme"

interface TextFieldProps extends InputProps {
  before?: ReactElement
  after?: ReactElement
}

export function TextField({ before, after, ...props }: TextFieldProps) {
  return (
    <InputGroup>
      {before && <InputLeftElement h="100%">{before}</InputLeftElement>}
      <Input
        borderColor={Color.GRAY}
        focusBorderColor={Color.PRIMARY}
        _disabled={{
          opacity: 0.6,
        }}
        _hover={{ borderColor: Color.DARK_GRAY }}
        {...props}
      />
      {after && <InputRightElement h="100%">{after}</InputRightElement>}
    </InputGroup>
  )
}
