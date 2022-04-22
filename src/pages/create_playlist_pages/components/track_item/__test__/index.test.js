import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import TrackItem from '..'
import data from "../../../../../data";
import store from '../../../../../global_state/store'

const {
  album: {
    images: [{ url }],
  },
  artists: [{ name: artist }],
  name: title,
} = data;

test('Should render track', ()=>{
    render(<Provider store={store}><TrackItem imgUrl={url} title={title} artist={artist}/></Provider>) 
    const imgElement = screen.getByRole('img',{
      name: title});
    expect(imgElement).toBeInTheDocument();

    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument();

    const artistsElement = screen.getByText(artist)
    expect(artistsElement).toBeInTheDocument();

    const btnElement = screen.getByRole('button', {
      name: /select/i
    })
    expect(btnElement).toBeInTheDocument();

    const btnEventElement = screen.getByText(/select/i)
    expect(btnEventElement).toBeInTheDocument();
  })