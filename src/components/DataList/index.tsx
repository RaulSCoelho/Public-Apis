import React from 'react'

import { Flex } from 'components/Flex'
import { Input } from 'components/Input'

interface Props {
  id: string
  object: object
  style?: object
  defaultValue?: string
}

export const DataList: React.FC<Props> = props => {
  return (
    <Flex style={{ height: 'auto' }}>
      <Input
        id={`${props.id}-input`}
        type="text"
        style={props.style}
        list={props.id}
        defaultValue={props.defaultValue}
      />
      {Array.isArray(props.object) ? (
        <datalist id={props.id}>
          {props.object.map((value, i) => {
            return <option value={value} key={i}></option>
          })}
        </datalist>
      ) : (
        <datalist id={props.id}>
          {Object.keys(props.object).map((value, i) => {
            return <option value={value} key={i}></option>
          })}
        </datalist>
      )}
    </Flex>
  )
}
