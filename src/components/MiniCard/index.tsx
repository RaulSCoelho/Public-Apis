import React, { memo } from 'react'

import { MiniCardStyle } from './styles'

interface Props {
  text: string
  type?: string
  onClick?: (text: string, type: string) => void
}

const MiniCard: React.FC<Props> = ({ text, type, onClick }) => {
  return (
    <MiniCardStyle onClick={() => onClick(text, type)}>{text}</MiniCardStyle>
  )
}

export default memo(MiniCard)
