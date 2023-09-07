import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlaylistCart = create(persist((set, get) => ({
    info: {
        title: "",
        message: "",
        to: "",
    },
    tracks: [],
    addTrack: (newTrack) => {
        const {tracks} = get()
        const isTrackAlreadyAdded = tracks.some((track) => track.id === newTrack.id)
        if (isTrackAlreadyAdded) return
        const newTracks = [...tracks, newTrack]
        set({tracks:newTracks})
    },
    deleteTrack: (idToDelete) => {
        const {tracks} = get();
        const newtracks = tracks.filter((track) => track.id !== idToDelete)
        set({tracks:newtracks})
    },
    cleanTracks: () => set({tracks : []})
}),
{
    name: "playlistCart"
}
 ))