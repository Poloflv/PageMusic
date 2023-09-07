import React from "react";
import { Link } from "react-router-dom";
import { DeleteIcon, IconPlay } from "../shared/Icons";

const TrackByPlaylistDetail = ({
  track,
  handleDeleteTrackByPlaylist,
  showDeleteBtn,
  showPlayBtn,
  setCurrentTrack
}) => {

  console.log(track);
    const handlePlaySong = () => {
        setCurrentTrack(track.spotifyId)
    }
  return (
    <article
      key={track.id}
      className="flex items-center gap-2 hover:bg-white/30 p-1 rounded-md pr-2 transition-colors"
    >
      <header className="rounded-md overflow-hidden w-[45px]">
        <img src={track.album.images[2].url} alt="" />
      </header>
      <section className="flex-1 text-sm sm:text-base">
        <Link to={`/tracks/${track.id}`} className="font-semibold line-clamp-1">
          {track.name}
        </Link>
        <Link
          to={`/artists/${track.artists[0].id}`}
          className="text-slate-300 text-xs font-light line-clamp-1 "
        >
          {track.artists[0].name}
        </Link>
      </section>
      <section className="flex items-center gap-2">
        {
            showDeleteBtn && (<button
                onClick={() => handleDeleteTrackByPlaylist(track.id)}
                className="group"
              >
                <DeleteIcon />
              </button>)
        }
        {
            showPlayBtn && (
        <button onClick={()=>handlePlaySong}>
          <IconPlay />
        </button>
            )
        }
      </section>
    </article>
  );
};

export default TrackByPlaylistDetail;
