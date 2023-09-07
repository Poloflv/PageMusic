import React, { useEffect, useState } from 'react'
import ContainerMusic from '../components/layout/ContainerMusic'
import { SearchIcon } from '../components/shared/Icons'
import ListPlaylists from '../components/playlists/ListPlaylists'
import { axiosMusic } from '../config/axios.config'

const Playlists = () => {

  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({data}) => setPlaylists(data))
      .catch((err) => console.log(err))
  }, [])
  return (
    <ContainerMusic>
      <header className="text-lg">
        <form  className="bg-purple-dark p-2 rounded-md flex gap-2 items-center">
          <button><SearchIcon/></button>
          <input
            id="home-querySearch"
            className="bg-transparent flex-1"
            type="text"
            placeholder="Buscar"
            autoComplete="off"
            size={10}
          />
          
        </form>
      </header>

      <ListPlaylists playlists={playlists}/>
    </ContainerMusic>
  )
}

export default Playlists