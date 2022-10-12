import React, { useCallback, useEffect, useState } from 'react'

import { FETCH } from 'api/fetch'
import { Flex } from 'components/Flex'
import { Input } from 'components/Input'
import MiniCard from 'components/MiniCard'
import { Text } from 'components/Text'
import { pallete } from 'styles/pallete'
import { sortObjList } from 'utils/Sort'

interface Country {
  id: number
  name: string
  translations: Object
  emojiU: string
}

interface State {
  id: number
  name: string
  state_code: string
  country_name: string
  country_code: string
}

interface City {
  id: number
  name: string
  state_name: string
  country_name: string
  country_code: string
}

export const Locations: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>(null)
  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>(null)
  const [countrySelected, setCountrySelected] = useState(null)
  const [stateSelected, setStateSelected] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const countriesURL =
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json'
      const statesURL =
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json'
      const citiesURL =
        'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json'

      const countries: any = await FETCH.get({
        url: countriesURL,
        simple: true,
      })

      const states: any = await FETCH.get({
        url: statesURL,
        simple: true,
      })

      const cities: any = await FETCH.get({
        url: citiesURL,
        simple: true,
      })

      return {
        countries,
        states,
        cities,
      }
    }
    fetchData().then(res => {
      setCountries(res.countries)
      setFilteredCountries(res.countries)
      setStates(res.cities)
      setCities(res.states)
    })
  }, [])

  const chooseStatesOrCity = useCallback(
    (name: string, type: 'country' | 'state') => {
      let newObject: Array<any> = []
      const list = type === 'country' ? states : cities
      const param = type === 'country' ? 'country_name' : 'state_name'

      for (const key in list) {
        if (list[key][param] === name) {
          newObject.push(list[key])
        }
      }

      newObject = sortObjList(newObject, 'name')

      if (newObject.length > 0) {
        if (type === 'country') {
          setCountrySelected(newObject[0].country_name)
          setFilteredStates(newObject)
        } else {
          setStateSelected(newObject[0].state_name)
          setFilteredCities(newObject)
        }
      }
    },
    [cities, states]
  )

  const filterCountries = useCallback(
    (country: string) => {
      const newCountries = countries.filter(c => {
        const name1 = c.name.toLocaleLowerCase()
        const name2 = country.toLocaleLowerCase()
        return name1.indexOf(name2) !== -1
      })
      setFilteredCountries(newCountries)
    },
    [countries]
  )

  const filterStates = useCallback(
    (state: string) => {
      const newStates = states.filter(s => {
        const name1 = s.name.toLocaleLowerCase()
        const name2 = state.toLocaleLowerCase()
        const name3 = s.country_name.toLocaleLowerCase()
        const name4 = countrySelected.toLocaleLowerCase()
        return name1.indexOf(name2) !== -1 && name3 === name4
      })
      setFilteredStates(newStates)
    },
    [countrySelected, states]
  )

  const filterCities = useCallback(
    (city: string) => {
      const newCities = cities.filter(c => {
        const name1 = c.name.toLocaleLowerCase()
        const name2 = city.toLocaleLowerCase()
        const name3 = c.state_name.toLocaleLowerCase()
        const name4 = stateSelected.toLocaleLowerCase()
        return name1.indexOf(name2) !== -1 && name3 === name4
      })
      setFilteredCities(newCities)
    },
    [cities, stateSelected]
  )

  return (
    <Flex style={FlexStyle}>
      <Flex style={SearchFlexStyle}>
        <Flex style={ShadowFlexStyle}>
          <Text style={TitleStyle}>Countries</Text>
          <Input
            id="search-country"
            style={InputStyle}
            placeholder="Search Countries"
            onInput={filterCountries}
          />
          <Flex>
            {filteredCountries.map((country, i) => {
              return (
                <MiniCard
                  text={country.name}
                  type="country"
                  onClick={chooseStatesOrCity}
                  key={i}
                />
              )
            })}
          </Flex>
        </Flex>
      </Flex>
      <Flex style={SearchFlexStyle}>
        <Flex style={ShadowFlexStyle}>
          <Text style={TitleStyle}>States</Text>
          <Input
            id="search-state"
            style={InputStyle}
            placeholder={countrySelected ? 'Search States' : 'Select a country'}
            onInput={filterStates}
            readOnly={!countrySelected}
          />
          {filteredStates?.map((state, i) => {
            return (
              <MiniCard
                text={state.name}
                type="state"
                onClick={chooseStatesOrCity}
                key={i}
              />
            )
          })}
        </Flex>
      </Flex>
      <Flex style={SearchFlexStyle}>
        <Flex style={ShadowFlexStyle}>
          <Text style={TitleStyle}>Cities</Text>
          <Input
            id="search-city"
            style={InputStyle}
            placeholder={stateSelected ? 'Search Cities' : 'Select a state'}
            onInput={filterCities}
            readOnly={!stateSelected}
          />
          {filteredCities?.map((city, i) => {
            return <MiniCard text={city.name} key={i} />
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

const FlexStyle: React.CSSProperties = {
  flexDirection: 'row',
  padding: '50px 300px 20px 300px',
  overflow: 'auto',
}

const SearchFlexStyle: React.CSSProperties = {
  width: '30%',
  justifyContent: 'start',
  borderRadius: '8px',
}

const ShadowFlexStyle: React.CSSProperties = {
  height: 'auto',
  boxShadow: '0 2px 2px rgba(0,0,0,0.22)',
  borderRadius: '8px',
}

const TitleStyle: React.CSSProperties = {
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}

const InputStyle: React.CSSProperties = {
  height: 'auto',
  padding: '10px',
  backgroundColor: pallete.white,
  border: `1px solid ${pallete.grey}`,
  borderTopColor: 'transparent',
  borderRadius: '0',
  fontSize: '14pt',
}
