import React from 'react'

import { FETCH } from 'api/fetch'
import { DataList } from 'components/DataList'
import { Flex } from 'components/Flex'
import { TextArea } from 'components/TextArea'
import { pallete } from 'styles/pallete'
import { languages } from 'utils/languages'

export const Translate: React.FC = () => {
  async function translate(text) {
    const url =
      'https://script.google.com/macros/s/AKfycbzGcpW4dQGRYaWLbFynM_3S-KQxS3VwbS4Osan3r0HZW9O_AffV5bizJOVyra9IA-72/exec'
    const sl = document.getElementById('source-lang-input') as HTMLInputElement
    const tl = document.getElementById('target-lang-input') as HTMLInputElement
    const translated = document.getElementById('translated') as HTMLInputElement
    const payload = {
      source_lang: languages[sl.value],
      target_lang: languages[tl.value],
      text,
    }

    const response: any = await FETCH.post({
      url,
      payload,
      includeCredentials: false,
      simple: true,
    })

    translated.value = response.message
  }

  return (
    <Flex style={FlexStyle}>
      <Flex style={TranslationFlexStyle}>
        <DataList
          id="source-lang"
          object={languages}
          style={InputLeft}
          defaultValue="Portuguese (Brazil)"
        />
        <DataList
          id="target-lang"
          object={languages}
          style={InputRight}
          defaultValue="English"
        />
      </Flex>
      <Flex style={TranslationFlexStyle}>
        <TextArea
          style={SourceTextAreaStyle}
          onInput={e => translate(e.target.value)}
        />
        <TextArea id="translated" style={TargetTextAreaStyle} readOnly />
      </Flex>
    </Flex>
  )
}

const FlexStyle = {
  width: '50%',
  height: 'auto',
  justifyContent: 'center',
  borderRadius: '8px',
  boxShadow: '0 2px 2px rgba(0,0,0,0.22)',
}

const TranslationFlexStyle = {
  flexDirection: 'row',
}

const InputStyle = {
  width: '100%',
  height: 'auto',
  padding: '10px',
  fontSize: '16pt',
  borderRadius: '0',
  backgroundColor: pallete.white,
  border: `1px solid ${pallete.grey}`,
  borderBottom: '0',
}

const InputLeft = {
  ...InputStyle,
  borderTopLeftRadius: '8px',
}

const InputRight = {
  ...InputStyle,
  borderTopRightRadius: '8px',
}

const textAreaStyle = {
  width: '100%',
  height: '200px',
  padding: '10px',
  fontSize: '12pt',
  borderRadius: '0',
  backgroundColor: pallete.white,
  border: `1px solid ${pallete.grey}`,
}

const SourceTextAreaStyle = {
  ...textAreaStyle,
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '0px',
}

const TargetTextAreaStyle = {
  ...textAreaStyle,
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '0px',
}
