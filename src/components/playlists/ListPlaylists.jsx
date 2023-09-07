import React from 'react'
import PlaylistCard from './PlaylistCard'

const ListPlaylists = ({playlists}) => {
  const quantityCassettes = playlists.length
  const HEIGHT_CASSETTE = 180
  const DISTANCE_DIFERENT = 54
  const heightContainer = ((quantityCassettes - 1)* DISTANCE_DIFERENT) + HEIGHT_CASSETTE
  return (
    <section className='w-[256px] mx-auto mt-10 relative' style={{height: `${heightContainer}px`}}>
        {
            playlists.map((playlist ,index) => <PlaylistCard key={playlist.id} playlist={playlist} index={index}/>)
        }
    </section>
  )
}

export default ListPlaylists