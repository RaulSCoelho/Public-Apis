import React, { useEffect, useState } from 'react'

import { FETCH } from 'api/fetch'
import { DataList } from 'components/DataList'
import { Flex } from 'components/Flex'
import { TextArea } from 'components/TextArea'
import { pallete } from 'styles/pallete'

interface Language {
  name: string
  code: string
  native_name: string
  en_name: string
}

export const Translate: React.FC = () => {
  const url =
    'https://script.google.com/macros/s/AKfycbyIvIhlEIijO0sJMXIUCc28p-Jt6aBJj_IBS2zUrwvrcQ_wZHf0KFJGMYlJeJd98U4I/exec'
  const [languages, setLanguages] = useState<Language[]>([])

  useEffect(() => {
    async function fetchData() {
      return await FETCH.get<Language[]>({ url, simple: true })
    }
    fetchData().then(res => setLanguages(res))
  }, [])

  async function translate(text) {
    const sl = document.getElementById('source-lang-input') as HTMLInputElement
    const tl = document.getElementById('target-lang-input') as HTMLInputElement
    const translated = document.getElementById('translated') as HTMLInputElement
    const sourceLang = languages.find(lang => lang.name === sl.value).code
    const targetLang = languages.find(lang => lang.name === tl.value).code

    const payload = {
      source_lang: sourceLang,
      target_lang: targetLang,
      text,
    }

    const response: any = await FETCH.post({
      url,
      payload,
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
          defaultValue="Português"
        />
        <DataList
          id="target-lang"
          object={languages}
          style={InputRight}
          defaultValue="Inglês"
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
