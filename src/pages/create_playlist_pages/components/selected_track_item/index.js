import React from "react";
import PropTypes from 'prop-types'
import Button from "../../../../global_component/button";
import { css } from '@emotion/css'

const selectedItem = css`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  display: flex;
  justify-content: left;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  img {
    width: 50px;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
    margin: auto 0;
  }
  .album {
    margin: auto;
    text-align: left;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .duration {
    margin: auto;
  }
`;

const container = css`
  text-align: left;
  margin: auto 0;
`;

const selectedInfo = css`
  width: 250px;
  .title {
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artist {
    font-size: 15px;
    margin-top: -20px;
  }
  .trackInfo{
      margin-left: 10px;
  }
`;
const btnDeselect = css`
margin: auto 10px;
button{
  background-color: rgba(30, 215, 96, 0.9);
  color: rgba(30, 55, 88, 1);
  border: none;
  border-radius: 10px;
  height: 25px;
  width: 100px;
  font-size: 15px;
  &:hover {
    background-color: rgba(30, 215, 96, 1);
}
}
`;
const SelectedTrackItem = ({ imgUrl, title, artist, album, duration, click }) => {
    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return (
        <div>
            <div className={selectedItem}>
                <img src={imgUrl} alt={title}/>
                <div className={container}>
                    <div className={selectedInfo}>
                        <div className="trackInfo">
                            <p className="title">{title}</p>
                            <p className="artist">{artist}</p>
                        </div>
                    </div>
                </div>
                <p className="album">{album}</p>
                <p className="duration">{millisToMinutesAndSeconds(duration)}</p>
                <Button
                    style={btnDeselect}
                    btnName='Deselect'
                    click={click}
                />
            </div>
        </div>
    )
}
SelectedTrackItem.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string,
    duration: PropTypes.number,
    click: PropTypes.func
  }
export default SelectedTrackItem;