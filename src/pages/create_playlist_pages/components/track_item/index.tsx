import React from "react";
import Button from "../../../../global_component/button";
import { css } from '@emotion/css'

const trackContainer = css`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  width: 400px;
  display: flex;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  img {
    width: 100px;
    height: 100px;
    padding: 5px;
    border-radius: 10px;
  }
`;

const infoContainer = css`
  text-align: left;
`;

const trackInfo = css`
  margin-left: 20px;
  color: white;
  .title {
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }
  .artist {
    font-size: 15px;
    margin-top: -20px;
  }
`;
const selectBtn = css`
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
interface Props {
  imgUrl: string,
  title: string,
  artist: string,
  click(): void
}
const TrackItem = ({imgUrl, title, artist, click} : Props) => {
    return (
        <div>
            <div className={trackContainer}>
                <img src={imgUrl} alt={title}/>
                <div className={infoContainer}>
                    <div className={trackInfo}>
                        <div>
                            <p className="title">{title}</p>
                            <p className="artist">{artist}</p>
                            <Button
                                style={selectBtn}
                                btnName='Select'
                                click={click}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TrackItem;