import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Flex } from 'components/Flex'
import { pallete } from 'styles/pallete'

export const Home: React.FC = () => {
  const navigate = useNavigate()

  const apps = ['Translate', 'Locations']

  return (
    <Flex style={FlexStyle}>
      {apps.map((app, i) => {
        return (
          <button
            style={buttonStyle}
            onClick={() => navigate(`/${app}`)}
            key={i}
          >
            {app}
          </button>
        )
      })}
    </Flex>
  )
}

const FlexStyle: React.CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'center',
}

const buttonStyle: React.CSSProperties = {
  fontSize: '18pt',
  padding: '15px',
  margin: '5px',
  backgroundColor: pallete.white,
  border: `1px solid ${pallete.grey}`,
  borderRadius: '8px',
  cursor: 'pointer',
}
