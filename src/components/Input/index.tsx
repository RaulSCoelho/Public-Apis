import React, { memo } from 'react'

import { FlexStyle } from '../Flex/styles'
import { InputStyle } from './styles'

interface Props {
  id?: string
  className?: string
  type?: string
  style?: object
  placeholder?: string
  defaultValue?: string
  value?: string
  onInput?: (e) => void
  readOnly?: boolean
  list?: string
}

export const InputComponent: React.FC<Props> = props => {
  return (
    <FlexStyle>
      <InputStyle
        id={props.id}
        className={props.className}
        type={props.type}
        style={props.style}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onInput={e => props.onInput((e.target as HTMLInputElement).value)}
        readOnly={props.readOnly}
        list={props.list}
      />
    </FlexStyle>
  )
}

export const Input = memo(InputComponent)
