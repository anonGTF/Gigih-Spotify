import { Song } from '../model/Song'
import { SongResponse } from '../model/SongResponse';

export async function getData<Result>(url: string, token: string): Promise<Result> {
    const respon = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(_ => _.ok ? _.json() : null);

    return respon;
}

export async function postData<Result, Body>(url: string, token: string, data: Body): Promise<Result> {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.json());

    return respon;
}

export function mapSongResponseToModel(song: SongResponse): Array<Song> {
    return song.tracks.items.map(item => ({
        id: item.id,
        uri: item.uri,
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.images[1].url,
        isSelected: false
    }) as Song);
}