import { css } from '@emotion/css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { accessToken } from '../../global_state/actions';
import Button from '../../global_component/button';
import TrackItem from './components/track_item';
import { InputBar } from '../../global_component/inputBar';
import SelectedTrackItem from './components/selected_track_item';

/* Header CSS ------------------------------*/
const header = css`
display: flex;
justify-content: space-between;
text-align: left;
height: 65px;
padding : 5px;
background-color: rgba(255, 255, 255, 0.2);
h1{
    font-size: 20px;
    margin-left: 20px;
}
`
const profileUser = css`
background-color: rgba(255, 255, 255, 0.1);
margin-right: 20px;
border-radius: 20px;
display: flex;
img{
    width:40px;
    height:40px;
    border-radius: 50px;
    margin: auto 10px;
}
p{
    color:white;
    margin: auto;
    margin-right: 10px;
}
`
/* Create Playlist CSS ----------------------*/
const inputBar = css`
width: 250px;
height: 25px;
padding: 0 10px;
`
const formCreatePlaylist = css`
text-align: left;
width: 90%;
margin: 20px auto;
textarea{
    width: 250px;
    height: 50px;
    padding: 10px 10px;
}
`
const btnCreate = css`
margin-top: 10px;
button{
    background-color: rgba(30, 215, 96, 0.9);
    color: rgba(30, 55, 88, 1);
    font-weight: bold;
    border: none;
    border-radius: 5px;
    height: 40px;
    width: 200px;
    font-size: 15px;
    &:hover {
        background-color: rgba(30, 215, 96, 1);
    }
}
`
/* Search Bar CSS -------------------------*/
const searchBar = css`
display: flex;
.btnSearch{
    margin-left: 20px;
}
`
const searchBtn = css`
button{
    background-color: rgba(30, 215, 96, 0.9);
    color: rgba(30, 55, 88, 1);
    font-weight: bold;
    border-radius: 5px;
    border: none;
    height: 30px;
    width: 100px;
    font-size: 15px;
    &:hover {
        background-color: rgba(30, 215, 96, 1);
    }
}
`
const searchList = css`
border-top: 1px solid rgba(255, 255, 255, 0.2);
width: 90%;
margin: auto;
h4{
    text-align: left;
}
`
/* Track List CSS ---------------------------*/
const gridView = css`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 400px 400px 400px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 10px;
`;
const gridViewSelected = css`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
const alert = css`
  font-size: 10px;
  color: white;
`;
/* ---------------------------------------------------------------------------------- */

const CreatePlaylist = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDesc, setPlaylistDesc] = useState('');
    const [keyword, setKeyword] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [userProfile, setUserProfile] = useState({id:'', name: '', image: ''});

    const accessTokenQuery = useSelector((state) => state.accessToken);
    const dispatch = useDispatch();
    toast.configure()

    const headers = { Authorization: `Bearer ${accessTokenQuery}` };
    useEffect(() => {
        handleParamsUrl();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (accessTokenQuery !== '') {
            getUserProfile();
            console.log(userProfile);
        }
    }, [accessTokenQuery]) // eslint-disable-line react-hooks/exhaustive-deps

    /* Handler Function----------------------------------------------------- */
    const handleParamsUrl = () => {
        const params = getParams();
        dispatch(accessToken(params.access_token));
    }
    const handlePlaylistName = (e) => {
        setPlaylistName(e.target.value);
    }
    const handlePlaylistDesc = (e) => {
        setPlaylistDesc(e.target.value);
    }
    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }
    const handleSelectedTracks = (id, name, image, artists, album, duration, uri) => {
        if (selectedTracks.length !== 0) {
            const check = selectedTracks.some((item) => { return item.id === id })
            if (check) {
                toast.warn("This song already added!!")
            } else {
                setSelectedTracks([...selectedTracks, { id: id, name: name, image: image, artists: artists, album: album, duration: duration, uri: uri }]);
            }
        } else {
            setSelectedTracks([...selectedTracks, { id: id, name: name, image: image, artists: artists, album: album, duration: duration, uri: uri }]);
        }
    }
    const handleDeselect = (id) => {
        const deselectTrack = selectedTracks.filter((item) => item.id !== id);
        setSelectedTracks(deselectTrack);
    }
    /* ------------------------------------------------------------------------- */

    /* Get Data---------------------------------------------------------------- */
    /* Get Track Data */
    const getDataTrack = async () => {
        const track = await fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=21`, {
            headers: headers
        })
            .then(response => response.json());
        setTracks(track.tracks.items);
    }
    /* Get URL Parameter */
    const getParams = () => {
        const stringAfterHashtag = window.location.hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {});
        return paramsSplitUp;
    }
    /* Get User Profile */
    const getUserProfile = async () => {
        const profile = await fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        }).then(response => response.json());
        setUserProfile({id: profile.id, name: profile.display_name, image: profile.images[0].url});
    }
    /* Create Playlist */
    const createPlaylistReq = () => {
        if (playlistName.length >= 10 && selectedTracks.length > 0) {
            fetch(`https://api.spotify.com/v1/users/${userProfile.id}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: playlistName, description: playlistDesc, public: false }),
            }).then(response => response.json())
                .then((jsonResponse) => {
                    const playlistId = jsonResponse.id;
                    return fetch(
                        `https://api.spotify.com/v1/users/${userProfile.id}/playlists/${playlistId}/tracks`,
                        {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({ uris: selectedTracks.map((item) => { return item.uri }) }),
                        }
                    );
                }).then(toast.success("Success creating playlist"));
            setPlaylistName('');
            setPlaylistDesc('');
            setSelectedTracks([]);
        } else {
            toast.error("Failed to create playlist!!")
        }

    }
    /*------------------------------------------------------------------------- */
    return (
        <div>
            <div className={header}>
                <h1>Create Playlist</h1>
                {userProfile !== {} ?
                    <div className={profileUser}>
                        <img src={userProfile.image} alt="profPic" />
                        <p>{userProfile.name}</p>
                    </div>
                    :<></>
                }
            </div>
            <div className={formCreatePlaylist}>
                <h4>Playlist Name</h4>
                <InputBar
                    style={inputBar}
                    value={playlistName}
                    onChange={handlePlaylistName}
                    placeHolder='Enter your playlist name...'
                />
                {playlistName.length < 10 && <p className={alert}>Playlist Name must be minimum 10 character</p>}
                <h4>Description</h4>
                <textarea placeholder='Description...' value={playlistDesc} onChange={handlePlaylistDesc}></textarea>
                <Button
                    style={btnCreate}
                    btnName='Create Playlist'
                    click={createPlaylistReq}
                />
                {selectedTracks !== 0 &&
                    <div className={gridViewSelected}>
                        {selectedTracks.map((item) => {
                            return (
                                <SelectedTrackItem
                                    key={item.id}
                                    imgUrl={item.image}
                                    title={item.name}
                                    artist={item.artists}
                                    album={item.album}
                                    duration={item.duration}
                                    click={() => { handleDeselect(item.id) }}
                                />
                            )
                        })}
                    </div>
                }
            </div>
            <div className={searchList}>
                <h4>Lets find something for your playlist</h4>
                <div className={searchBar}>
                    <InputBar
                        style={inputBar}
                        value={keyword}
                        onChange={handleKeyword}
                        placeHolder='Search...'
                    />
                    <div className='btnSearch'>
                        <Button
                            style={searchBtn}
                            btnName='Search'
                            click={getDataTrack}
                        />
                    </div>
                </div>
                {tracks.length !== 0 &&
                    <div className={gridView}>
                        {tracks.map((item) => {
                            return (
                                <TrackItem
                                    key={item.id}
                                    imgUrl={item.album.images[0].url}
                                    title={item.name}
                                    artist={item.artists[0].name}
                                    click={() => handleSelectedTracks(item.id, item.name, item.album.images[0].url, item.artists[0].name, item.album.name, item.duration_ms, item.uri)}
                                />
                            )
                        })}
                    </div>
                }

            </div>
        </div>
    )
}
export default CreatePlaylist;