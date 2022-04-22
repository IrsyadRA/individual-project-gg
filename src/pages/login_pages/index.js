import Button from "../../global_component/button";
import { css } from "@emotion/css";
import React from 'react';

const loginBtn = css`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
button {
    background-color: rgba(30, 215, 96, 0.9);
    color: rgba(30, 55, 88, 1);
    font-weight: bold;
    border: none;
    border-radius: 20px;
    height: 45px;
    width: 200px;
    font-size: 15px;
    &:hover {
        background-color: rgba(30, 215, 96, 1);
    }
  }
`
const logo = css`
img{
    width: 750px;
}
`
const LoginPage = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const REDIRECT_URL_AFTER_LOGIN = 'https://individual-project-gg.vercel.app/create-playlist' /* set this to 'http://localhost:3000/create-playlist' if you want to run it on local*/
    const SPACE_DELIMITER = "%20";
    const SCOPE = ['playlist-modify-private', 'user-read-private']
    const SCOPE_URL = SCOPE.join(SPACE_DELIMITER);

    const handleLogin = () => {
        let url = SPOTIFY_AUTHORIZE_ENDPOINT;
        url += '?response_type=token';
        url += `&client_id=${CLIENT_ID}`;
        url += `&scope=${SCOPE_URL}`;
        url += `&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}`;
        url += '&show_dialog=true';

        window.location = url;
    }
    const handleLoginBtn = () => {
        handleLogin()
    }
    return (
        <div>
            <div className={logo}>
                <img src='/Spotify-Logo.wine.png' alt="logo" />
            </div>
            <Button
                btnName="Login Spotify"
                style={loginBtn}
                click={handleLoginBtn}
            />
        </div>
    )
}

export default LoginPage;