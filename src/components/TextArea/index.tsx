import React from 'react'

import { FlexStyle } from '../Flex/styles'
import { TextAreaStyle } from './style'

interface Props {
  id?: string
  className?: string
  style?: object
  placeholder?: string
  defaultValue?: string
  value?: string
  onInput?: (e) => void
  readOnly?: boolean
}

export const TextArea: React.FC<Props> = props => {
  return (
    <FlexStyle>
      <TextAreaStyle
        id={props.id}
        className={props.className}
        style={props.style}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
        onInput={props.onInput}
        readOnly={props.readOnly}
      />
    </FlexStyle>
  )
}
