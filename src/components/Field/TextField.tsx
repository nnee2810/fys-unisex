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
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
}

export function TextField({ icon, ...props }: TextFieldProps) {
  return (
    <InputGroup>
      {icon?.before && (
        <InputLeftElement h="100%">{icon.before}</InputLeftElement>
      )}
      <Input
        h="40px"
        borderColor={Color.GRAY}
        focusBorderColor={Color.PRIMARY}
        _disabled={{
          opacity: 0.6,
        }}
        _hover={{ borderColor: Color.DARK_GRAY }}
        {...props}
      />
      {icon?.after && (
        <InputRightElement h="100%">{icon?.after}</InputRightElement>
      )}
    </InputGroup>
  )
}
