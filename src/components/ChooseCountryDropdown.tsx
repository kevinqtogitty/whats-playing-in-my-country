import React, { useEffect, useContext } from 'react'

import { MainStore } from '../contexts/context'
import { getCurrentlyPlaying, getUpcomingMovies } from '../services/films'

import { countryOptions } from '../constants/constants'
import { CountryDropdown } from '../stylesheets/styled_components/countryDropdown'

const ChooseCountry: React.FC = (): JSX.Element => {
  const { currentCountryKey, setCurrentCountryKey, setCurrentCountry, setFilms, setUpcomingFilms } =
    useContext(MainStore)

  // Everytime the country changes change the currently playing
  useEffect(() => {
    getCurrentlyPlaying(currentCountryKey)
      .then(setFilms)
      .catch(() => {})
  }, [currentCountryKey])

  // Everytime the country changes change the upcoming movies
  useEffect(() => {
    getUpcomingMovies(currentCountryKey)
      .then(setUpcomingFilms)
      .catch(() => {})
  }, [currentCountryKey])

  // Everytime the country key changes store the key in local storage
  useEffect(() => {
    sessionStorage.setItem('current-country-key', currentCountryKey)
  }, [currentCountryKey])

  // on a specific element, the HTMLSelectElement
  const changeCountry = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const switchCountryKey = event.target.value
    const countryToSwitch = countryOptions.find((country) => country.id === switchCountryKey)
    if (countryToSwitch != null) {
      setCurrentCountry(countryToSwitch.label)
      setCurrentCountryKey(countryToSwitch.id)
    }
  }

  return (
    <>
      <CountryDropdown onChange={changeCountry}>
        <option selected={true} disabled={true}>
          Country
        </option>
        {countryOptions.map((country, index) => (
          <option key={index} value={country.id}>
            {country.label}
          </option>
        ))}
      </CountryDropdown>
    </>
  )
}

export default ChooseCountry
