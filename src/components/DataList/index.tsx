import React from 'react'

import { Flex } from 'components/Flex'
import { Input } from 'components/Input'

interface Language {
  name: string
  code: string
  native_name: string
  en_name: string
}

interface Props {
  id: string
  object: Array<Language>
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
        onInput={console.log}
      />
      <datalist id={props.id}>
        {props.object.map((lang, i) => {
          return <option value={lang.name} key={i}></option>
        })}
      </datalist>
    </Flex>
  )
}
