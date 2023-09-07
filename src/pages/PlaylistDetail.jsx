import React, { useEffect, useRef, useState } from "react";
import ContainerMusic from "../components/layout/ContainerMusic";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PencilIcon,
  SaveIcon,
  ShareIcon,
  TrashIcon,
} from "../components/shared/Icons";
import { axiosMusic } from "../config/axios.config";
import ListPlaylistDetail from "../components/playlistDetail/ListPlaylistDetail";
import EmbedTrack from "../components/shared/EmbedTrack";

const PlaylistDetail = () => {
  const [isShowSideA, setIsShowSideA] = useState(true);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null)


  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate()

  const handleDeleteTrackByPlaylist = (idTrackToDelete) => {
    axiosMusic
      .delete(`/api/playlists/${playlistInfo.id}/tracks/${idTrackToDelete}`)
      .then(({ data }) => {
        const newTracks = playlistInfo.tracks.filter(
          (track) => track.id !== idTrackToDelete
        );
        setPlaylistInfo({ ...playlistInfo, tracks: newTracks });
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePlaylist = () => {
    axiosMusic
      .delete(`/api/playlists/${id}`)
      .then(({ data }) => {
        navigate("/playlists")
      })
      .catch((err) => console.log(err));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    axiosMusic
      .patch(`/api/playlists/${id}`, data)
      .then(({data}) =>alert("Playlist actualizada correctamente"))
      .catch((err) => console.log(err))
  }

  return (
    <ContainerMusic>
      <Link to={-1}>{"<"} Atras</Link>

      <form
        onSubmit={handleSubmit}
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
              onFocus={() => setIsShowSideA(true)}
            />
            <label htmlFor="">
              <PencilIcon />
            </label>
          </div>
          <Link
            to={`/playlists/public/${id}`}
            target="_blank"
            className="absolute right-5 bottom-4 border-2 border-white rounded-full p-1 hover:border-yellow-border group transition-colors"
          >
            <ShareIcon />
          </Link>

          <button
            type="submit"
            to={`/playlists/public/${id}`}
            className="absolute left-5 bottom-4 border-2 border-white rounded-full p-1 hover:border-yellow-border group transition-colors"
          >
            <SaveIcon />
          </button>

          <button
            type="button"
            onClick={handleDeletePlaylist}
            to={`/playlists/public/${id}`}
            className="absolute left-16 bottom-4 border-2 border-white rounded-full p-[8px] hover:border-yellow-border group transition-colors"
          >
            <TrashIcon />
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
              id="playlistDetail_to"
              onFocus={() => setIsShowSideA(false)}
            />
            <label htmlFor="">
              <PencilIcon />
            </label>
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
              id="playlistDetail_message"
              onFocus={() => setIsShowSideA(false)}
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
      {/* <ListCartPlaylist tracks={tracks} /> */}

      {
          currentTrack && <EmbedTrack trackId={currentTrack}/>
      }

      <ListPlaylistDetail
        handleDeleteTrackByPlaylist={handleDeleteTrackByPlaylist}
        tracks={playlistInfo?.tracks ?? []}
        showDeleteBtn
        showPlayBtn
        setCurrentTrack={setCurrentTrack}
      />
    </ContainerMusic>
  );
};

export default PlaylistDetail;
