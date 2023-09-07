import React from 'react'
import { Link } from 'react-router-dom'
import TrackPlaylistCart from './TrackPlaylistCart'

const ListCartPlaylist = ({tracks}) => {
  return (
    <section className='max-h-[265px] overflow-y-auto'>
        {
            tracks.map((track) => <TrackPlaylistCart key={track.id} track={track}/>
            )
        }
    </section>
  )
}

export default ListCartPlaylist