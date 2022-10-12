import React, { memo } from 'react'

import { FlexStyle } from './styles'

interface Props {
  children?: React.ReactNode
  style?: object
}

export const FlexComponent: React.FC<Props> = ({ children, style }) => {
  return <FlexStyle style={style}>{children}</FlexStyle>
}

export const Flex = memo(FlexComponent)
