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
    console.log(song.tracks.items[0].duration_ms);
    return song.tracks.items.map(item => ({
        id: item.id,
        uri: item.uri,
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.images[1].url,
        duration: item.duration_ms,
        isSelected: false
    }) as Song);
}

export function formatMilliseconds(milliseconds: number): string {
    function pad(num: number): string {
        return `${num}`.padStart(2, '0');
    }
    const asSeconds = milliseconds / 1000;

    let hours = undefined;
    let minutes = Math.floor(asSeconds / 60);
    let seconds = Math.floor(asSeconds % 60);

    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        minutes %= 60;
    }

    return hours
        ? `${hours}:${pad(minutes)}:${pad(seconds)}`
        : `${minutes}:${pad(seconds)}`;
}