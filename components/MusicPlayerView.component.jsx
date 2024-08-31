import React, { useState, useRef, useEffect } from 'react';
import { 
  BsSkipBackwardFill, 
  BsSkipForwardFill,
  BsFillPlayFill,
  BsFillPauseFill,
} from "react-icons/bs";
import Image from 'next/image';

const next_playable_song = (song_list, idx) => {
  for (let i = (idx + 1) % song_list.length; ; 
       i = (i + 1) % song_list.length) {
    if (song_list[i].BVID.length > 0) {
      return i;
    }
  }
  return -1;
}

const prev_playable_song = (song_list, idx) => {
  for (let i = (idx - 1 + song_list.length) % song_list.length; ; 
       i = (i - 1 + song_list.length) % song_list.length) {
    if (song_list[i].BVID.length > 0) {
      return i;
    }
  }
  return -1;
}

const is_playable = (song_list, idx) => {
  if (song_list === undefined || song_list[idx] === undefined) {
    return false;
  }
  if (song_list[idx].BVID === undefined) {
    return false;
  }
  return song_list[idx].BVID.length > 0;
}

const info_url = "https://api.suij1sui.space/api/v1/video/info?bvid=";
const data_url = "https://api.suij1sui.space/api/v1/video/rdata?r=";

const MusicPlayerView = ({ props: [idx, EffThis] }) => {
  if (idx !== -1 && !is_playable(EffThis.current_album, idx)) {
    idx = -1;
  }
  let song_list = EffThis.current_album;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    song_name: "---",
    artist: "---",
  });

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const [artworkUrl, setArtworkUrl] = useState("favicon.png");
  const [bvid, setBvid] = useState("");

  useEffect(() => {
    if (idx !== -1) {
      let bvid = song_list[idx].BVID;
      if (bvid.length > 0) {
        if (bvid.endsWith("，")) {
          bvid = bvid.slice(0, -1);
        }
        let bvid_list = bvid
          .trim().split(/，/g);
        setBvid(bvid_list[bvid_list.length - 1]);
      }
    } else {
      setBvid("");
    }
  }, [EffThis, idx, song_list]);

  useEffect(() => {
    const fetch_audio_url = async (bvid) => {
      if (bvid === "") {
        return;
      }
      let url = info_url + bvid;
      const response = await fetch(url);
      const data = await response.json();
      let audio_url = data["info"]
      setArtworkUrl(data_url + data["artwork"]);
      setCurrentSong({
        song_name: song_list[idx].song_name,
        artist: song_list[idx].artist,
      });
      setIsPlaying(true);
      audioRef.current.src = data_url + audio_url;
      await audioRef.current.play(); 
    }
    fetch_audio_url(bvid)
      .catch((err) => {
        console.log(err);
      });
  }, [bvid, idx, song_list]);

  let media_session_api = 
    (typeof window !== 'undefined' && 'mediaSession' in window.navigator);

  useEffect(() => {
    if (!(typeof window !== 'undefined' && 'mediaSession' in window.navigator)) {
      return;
    }
    window.navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.song_name + " - " + document.title,
      artist: currentSong.artist,
      album: document.title,
      artwork: [
        { src: artworkUrl, sizes: '256x256', type: 'image/png' },
      ],
    });
  }, [currentSong, artworkUrl]);

  const fetch_artwork = async (bvid) => {
    setArtworkUrl(
      `https://api.suij1sui.space/api/v1/video/info?bvid=${bvid}&pic=1`
    );
  }

  useEffect(() => {
    if (!media_session_api) { return }
    window.navigator.mediaSession.setActionHandler('nexttrack', () => {
      EffThis.play_music_at(next_playable_song(song_list, idx));
    });
    return () => {
      window.navigator.mediaSession.setActionHandler('nexttrack', null);
    }
  });

  useEffect(() => {
    if (!media_session_api) { return }
    window.navigator.mediaSession.setActionHandler('previoustrack', () => {
      EffThis.play_music_at(prev_playable_song(song_list, idx));
    });
    return () => {
      window.navigator.mediaSession.setActionHandler('previoustrack', null);
    }
  });

  useEffect(() => {
    if (!media_session_api) { return }
    window.navigator.mediaSession.setActionHandler('play', () => {
      audioRef.current.play();
    });
    return () => {
      window.navigator.mediaSession.setActionHandler('play', null);
    }
  });

  useEffect(() => {
    if (!media_session_api) { return }
    window.navigator.mediaSession.setActionHandler('pause', () => {
      audioRef.current.pause();
    });
    return () => {
      window.navigator.mediaSession.setActionHandler('pause', null);
    }
  });

  return (
    <>
    <div className="flex items-center z-10">
      <audio preload="none" ref={audioRef}
        onError={
          async () => {
            console.error("failed to load resource");
            EffThis.play_music_at(-1);
            await new Promise(r => setTimeout(r, 1000));
            EffThis.play_music_at(idx);
          }
        }
        onEnded={
          () => {
            idx = next_playable_song(song_list, idx);
            EffThis.play_music_at(idx);
          }
        }
        onPause={
          () => {
            setIsPlaying(false);
          }
        }
        onPlay={
          () => {
            setIsPlaying(true);
          }
        }
        title={currentSong.song_name}
      >
      </audio>
      <div className="flex items-center fixed bottom-0 left-0 w-full bg-music-player-bg text-white pl-[1rem] z-10">
        <div className="mr-2 w-[3rem] h-[3rem] relative">
          <Image src={artworkUrl} alt="artwork"
            loader={({src}) => src}
            layout='fill' objectFit='contain'
            onError={
              async () => {
                setArtworkUrl("favicon.png");
                await new Promise(r => setTimeout(r, 1000));
                await fetch_artwork(bvid);
              }
            }
            unoptimized
          />
        </div>
        <div className="m-2 inline"
          onClick={
            () => {
              idx = prev_playable_song(song_list, idx);
              EffThis.play_music_at(idx);
            }
          }
        >
          <BsSkipBackwardFill />
        </div>
        <div 
          onClick={togglePlay}
          className="m-2 inline"
        >
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill /> }
        </div>
        <div className="m-2 inline"
          onClick={
            () => {
              idx = next_playable_song(song_list, idx);
              EffThis.play_music_at(idx);
            }
          }
        >
          <BsSkipForwardFill />
        </div>
        <div className="mt-2 mb-2 ml-4">
          <div className="text-base font-bold">
            {currentSong.song_name}
          </div>
          <div className="font-light text-sm">
            {currentSong.artist}
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default MusicPlayerView;
