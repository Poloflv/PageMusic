import React, { useEffect, useRef, useState } from 'react'
import PublicLayout from '../components/layout/PublicLayout'
import ContainerMusic from '../components/layout/ContainerMusic'
import { axiosMusic } from '../config/axios.config';
import { Link, useParams } from 'react-router-dom';
import ListPlaylistDetail from '../components/playlistDetail/ListPlaylistDetail';
import { AddIcon, PencilIcon, PlusIcon, SaveIcon, ShareIcon, TrashIcon } from '../components/shared/Icons';
import TrackEmbed from '../components/shared/EmbedTrack';
import EmbedTrack from '../components/shared/EmbedTrack';

const PlaylistShared = () => {
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const {id} = useParams()
  const [isShowSideA, setIsShowSideA] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null)
  const formRef = useRef(null);

  const handleCopyUrl = () => {
    const actualUrl = window.location.href
    navigator.clipboard.writeText(actualUrl).then(() => alert("Copiado al portapapeles"))
  }


  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => setPlaylistInfo(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (playlistInfo) {
      formRef.current.playlistDetail_title.value = playlistInfo.title;
      formRef.current.playlistDetail_to.value = playlistInfo.to;
      formRef.current.playlistDetail_message.value = playlistInfo.message;
    }
  }, [playlistInfo]);

  return (
    <PublicLayout>
      <ContainerMusic>


      <form
        ref={formRef}
        id="formPlaylistCart"
        className={`relative card w-[238px] mx-auto ${
          isShowSideA ? "sideA" : "sideB"
        }`}
      >
        {/* Parte frontal (lado A) */}
        <div className="relative front">
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-4 left-5 px-2 rounded-md w-[196px] ">
            <input
              className="text-black bg-transparent outline-none p-1 text-sm flex-1"
              size={10}
              placeholder="Título"
              type="text"
              name="title"
              required
              id="playlistDetail_title"
              disabled
            />
          </div>
          <button
            onClick={handleCopyUrl}
            type='button'
            to={`/playlists/public/${id}`}
            target="_blank"
            className="absolute right-5 bottom-4 border-2 border-white rounded-full p-1 hover:border-yellow-border group transition-colors"
          >
            <ShareIcon />
          </button>



          <button
            type="button"

            to={`/playlists/public/${id}`}
            className="absolute right-14 bottom-4 border-2 border-white rounded-full p-[8px] hover:border-yellow-border group transition-colors"
          >
            <PlusIcon />
          </button>
        </div>
        {/* Parte trasera (lado B) */}
        <div className="absolute top-0 left-[1px] back">
          <img className="mx-auto" src="/images/cassette.png" alt="" />
          <div className="flex items-center gap-2 bg-white absolute top-4 left-5 px-2 rounded-md w-[196px] ">
            <input
              className="text-black bg-transparent outline-none p-1 text-sm flex-1"
              size={10}
              placeholder="Para:"
              type="text"
              name="to"
              required
              disabled
              id="playlistDetail_to"
            />

          </div>
          <div className="flex items-center gap-2 bg-white absolute top-12 left-5 px-2 rounded-md w-[196px] ">
            <textarea
              className="text-black bg-transparent outline-none p-1 text-sm flex-1 resize-none"
              rows={4}
              size={10}
              placeholder="Dedicatoria"
              type="text"
              name="message"
              required
              disabled
              id="playlistDetail_message"
            />
          </div>
        </div>
      </form>


      <button
        className="max-w-max mx-auto block mt-4"
        onClick={() => setIsShowSideA(!isShowSideA)}
        >
        {isShowSideA ? "Lado B" : "Lado A"}
      </button>
        
        {
          currentTrack && <EmbedTrack trackId={currentTrack}/>
        }
        
        <ListPlaylistDetail
          setCurrentTrack={setCurrentTrack}
          showPlayBtn
          
          tracks={playlistInfo?.tracks ?? []}
        />

      </ContainerMusic>
    </PublicLayout>
  )
}

export default PlaylistShared