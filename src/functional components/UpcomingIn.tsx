import React, { useContext } from 'react'

import { CurrentCountryContext } from '../contexts/context'
import styled from 'styled-components'
import UpcomingFilmCards from './UpcomingFIlmsCards'

export const BannerHeader = styled.h2`
  color: antiquewhite;
  padding-left: 1.2rem;
  font-size: 2rem;
  position: absolute;
  width: fit-content;
`
export const FilmsBanner = styled.div`
  background-color: #0d1321;
  width: auto;
  overflow: scroll;
  padding: 1rem;
  margin-top: -1.7rem;
  margin: 0px;
`
const FilmCardWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-top: 6rem;
  @media (max-width: 500px) {
    margin-top: 8rem;
  }
`

const UpcomingIn: React.FC = () => {
  const { currentCountry, upcomingFilms } = useContext(CurrentCountryContext)
  return (
    <>
      <FilmsBanner>
        <BannerHeader>Upcoming films in {currentCountry}</BannerHeader>
        <FilmCardWrapper>
          {upcomingFilms?.map((film) =>
            film.poster_path !== null ? (
              <UpcomingFilmCards
                poster_path={film.poster_path}
                original_title={film.original_title}
                release_date={film.release_date}
                vote_average={film.vote_average}
                overview={film.overview}
              />
            ) : null,
          )}
        </FilmCardWrapper>
      </FilmsBanner>
    </>
  )
}

export default UpcomingIn
