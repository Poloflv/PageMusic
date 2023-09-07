import React, { useEffect, useState } from 'react'
import ContainerMusic from '../components/layout/ContainerMusic'
import {Swiper, SwiperSlide} from "swiper/react"
import { Link, useParams } from 'react-router-dom'
import { axiosMusic } from '../config/axios.config'
import "swiper/css"
import SlideAlbums from '../components/shared/SlideAlbums'
import ListTracksDefault from '../components/shared/ListTracksDefault'

const ArtistDetail = () => {
  const [artist, setArtist] = useState(null)
  const {id} = useParams()
  console.log(artist);

  useEffect(() => {
    axiosMusic
      .get(`/api/artists/${id}`)
      .then(({data}) => setArtist(data))
      .catch((err) => console.log(err))
  }, [id])
  return (
    <ContainerMusic>
      <Link to={-1} className='mb-4 block hover:text-yellow-border transition-colors'>{"<"} Atras</Link>
      <header className='grid gap-4 sm:grid-cols-2 sm:items-center'>
        <div className='rounded-xl overflow-hidden sm:rounded-full sm:w-full sm:aspect-square'>
          <img className='w-full h-full object-cover' src={artist?.images[1]?.url} alt="" />
        </div>
        <section>
          <h2 className='textlg font-semibold line-clamp-1'>{artist?.name}</h2>
          <ul>
            <li className='font-light'><span className='font-semibold'>Seguidores:</span> {artist?.followers.total}</li>
            <li className='font-light'><span className='font-semibold'>Popularidad:</span> {artist?.popularity}</li>
          </ul>
          <section>
            <h4 className='font-semibold'>Generos:</h4>
            <ul className='flex flex-wrap gap-2 mt-2'>
              {
                artist?.genres.slice(0,4).map((genre)=> <li className='border p-1 px-2 border-purple-500 rounded-full' key={genre}>{genre}</li>)
              }
            </ul>
          </section>
        </section>
      </header>
      <section className='mt-4'>
        <h3 className='text-xl font-semibold'>Otros discos del artista</h3>
        <SlideAlbums albums={artist?.albums ?? []}/>
        <section>

        </section>
      </section>
      <section className='mt-4'>
        <h3 className='text-xl font-semibold'>Las mas sonadas</h3>
        <ListTracksDefault tracks={artist?.songsTop ?? []}/>
      </section>
    </ContainerMusic>
  )
}

export default ArtistDetail