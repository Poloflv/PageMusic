import React, { useState } from "react";
import { PencilIcon } from "../shared/Icons";
import "./PopUpPlaylist.css";
import ListCartPlaylist from "./ListCartPlaylist";
import { usePlaylistCart } from "../../store/playlistCart";
import axios from "axios";
import { axiosMusic } from "../../config/axios.config";

const PopUpPlaylist = ({ isShowCurrentPlaylist }) => {
  const [isShowSideA, setIsShowSideA] = useState(true);
  const tracks = usePlaylistCart((store) => store.tracks);
  const cleanTracks = usePlaylistCart((store) => store.cleanTracks);

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data.tracks = tracks
    // console.log(data);
    axiosMusic
        .post("/api/playlists", data)
        .then(() => {
            e.target.reset()
            cleanTracks()
        })
        .catch((err) => console.log(err))
  };
  return (
    <article
      className={`absolute w-[271.6px] z-10  -bottom-4 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-yellow-border  transition-[right] ${
        isShowCurrentPlaylist ? "right-4" : "-right-full"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        id="formPlaylistCart"
        className={`relative card  ${isShowSideA ? "sideA" : "sideB"}`}
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
              onFocus={()=> setIsShowSideA(true)}

            />
            <label htmlFor="">
              <PencilIcon />
            </label>
          </div>
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
              onFocus={()=> setIsShowSideA(false)}
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
              onFocus={()=> setIsShowSideA(false)}

            />
          </div>
        </div>
      </form>
      <button onClick={() => setIsShowSideA(!isShowSideA)}>
        {isShowSideA ? "Lado B" : "Lado A"}
      </button>
      <ListCartPlaylist tracks={tracks} />
      <button form="formPlaylistCart">Crear</button>
    </article>
  );
};

export default PopUpPlaylist;
