import React from 'react'
import TrackDefaultCard from './TrackDefaultCard'

const ListTracksDefault = ({tracks}) => {
  return (
    <section className='grid gap-2 pt-6'>
        {
          tracks.map((track) =>
          <TrackDefaultCard key={track.id} track={track}/>
          )
        }
      </section>
  )
}

export default ListTracksDefault