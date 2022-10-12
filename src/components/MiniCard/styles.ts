import { FlexStyle } from 'components/Flex/styles'
import styled from 'styled-components'
import { pallete } from 'styles/pallete'

export const MiniCardStyle = styled(FlexStyle)`
  background-color: ${pallete.white};
  border: 1px solid ${pallete.grey};
  border-top: 0;
  font-size: 14pt;
  padding: 5px 0 5px 0;
  cursor: pointer;

  &:hover {
    background-color: ${pallete.grey};
  }
`
