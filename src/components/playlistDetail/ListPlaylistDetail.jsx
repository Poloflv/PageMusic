import React from "react";
import TrackByPlaylistDetail from "./TrackByPlaylistDetail";

const ListPlaylistDetail = ({
  tracks,
  handleDeleteTrackByPlaylist,
  showPlayBtn,
  showDeleteBtn,
  setCurrentTrack,
}) => {
  return (
    <section className="grid gap-2">
      {tracks.map((track) => (
        <TrackByPlaylistDetail
          track={track}
          handleDeleteTrackByPlaylist={handleDeleteTrackByPlaylist}
          showDeleteBtn={showDeleteBtn}
          showPlayBtn={showPlayBtn}
          key={track.id}
          setCurrentTrack={setCurrentTrack}
        />
      ))}
    </section>
  );
};

export default ListPlaylistDetail;
