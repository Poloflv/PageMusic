import React, { useState } from "react";
import { LogoutIcon, MinimalPlayIcon, PlaylistIcon } from "../shared/Icons";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../store/userInfo";
import PopUpPlaylist from "../playlist/PopUpPlaylist";
import { usePlaylistCart } from "../../store/playlistCart";

const PrincipalLayout = ({ children }) => {
  const [isShowAuthOptions, setisShowAuthOptions] = useState(false);
  const [isShowCurrentPlaylist, setIsShowCurrentPlaylist] = useState(false);
  const tracks = usePlaylistCart((store) => store.tracks);
  const cleanTracks = usePlaylistCart((store) => store.cleanTracks);
  const logout = useUserInfo((state) => state.logout);

  const handleClickLogout = () => {
    logout()
    cleanTracks()
  };
  return (
    <section className="min-h-screen overflow-hidden font-urbanist bg-purple-bg text-white bg-[url(/images/bg-auth-mobile.png)] bg-right-bottom bg-no-repeat sm:bg-[url(/images/bg-auth-desktop.png)]">
      <header className="flex p-2 justify-between items-center bg-purple-dark sm:text-lg relative">
        <Link to={"/"}>
          <h1 className="uppercase font-semibold">Gift Music</h1>
        </Link>

        <section className="flex gap-4 [&>button]:uppercase [&>button]:border-[1px] [&>button]:py-1 [&>button]:px-2 [&>button]:text-sm [&>button]:rounded-full [&>button]:font-semibold [&>button]:border-yellow-border ">
          <button
            onClick={() => setisShowAuthOptions(!isShowAuthOptions)}
            className="hover:bg-purple-light"
          >
            Mi cuenta
          </button>
          <button
            onClick={() => setIsShowCurrentPlaylist(!isShowCurrentPlaylist)}
            className="flex gap-3 sm:gap-2 items-center hover:bg-purple-light"
          >
            {/* <img src='/images/playlistIcon.svg'/> */}
            <PlaylistIcon />
            <span className="hidden sm:inline">Grabando</span> {tracks.length}
          </button>
        </section>

        {/* Popup Auth */}
        <article
          className={`absolute  -bottom-4 translate-y-full grid bg-purple-light p-4 gap-2 rounded-lg border border-yellow-border  transition-[right] ${
            isShowAuthOptions ? "right-4" : "-right-full"
          }`}
        >
          <Link
            to={"/playlists"}
            className="flex gap-2 items-center font-semibold hover:text-yellow-border group"
          >
            <MinimalPlayIcon />
            Mis grabaciones
          </Link>
          <button
            onClick={handleClickLogout}
            className="flex gap-2 items-center font-semibold hover:text-yellow-border group"
          >
            <LogoutIcon />
            Cerrar sesion
          </button>
        </article>

        {/* Popup Playlist*/}
        <PopUpPlaylist isShowCurrentPlaylist={isShowCurrentPlaylist} />
      </header>
      <section className="flex justify-center items-center px-4 pt-10">
        {children}
      </section>
    </section>
  );
};

export default PrincipalLayout;
