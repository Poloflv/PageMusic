import React from 'react'
import { PencilIcon } from '../shared/Icons'
import { Link } from 'react-router-dom'

const PlaylistCard = ({playlist, index}) => {

  const topDistance = index * 54
  

  return (
    
        <Link to={`/playlists/${playlist.id}`} className="absolute front transition-transform hover:-translate-y-4 hover:rotate-2 cursor-pointer" style={{top: `${topDistance}px`}}>
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-[18px] left-5 px-2 rounded-md w-[198px] ">
            
            <h3 className='text-black flex-1 line-clamp-1'>{playlist.title}</h3>
            <PencilIcon />
            
          </div>
        </Link>
    
  )
}

export default PlaylistCard