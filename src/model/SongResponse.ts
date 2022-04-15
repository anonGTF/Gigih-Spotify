export interface SongResponse {
    tracks: Tracks;
}

export interface Tracks {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    album:            Album;
    artists:          Artist[];
    availableMarkets: string[];
    discNumber:       number;
    durationMS:       number;
    explicit:         boolean;
    externalIDS:      ExternalIDS;
    externalUrls:     ExternalUrls;
    href:             string;
    id:               string;
    isLocal:          boolean;
    name:             string;
    popularity:       number;
    previewURL:       null | string;
    trackNumber:      number;
    type:             ItemType;
    uri:              string;
}

export interface Album {
    albumType:            AlbumTypeEnum;
    artists:              Artist[];
    availableMarkets:     string[];
    externalUrls:         ExternalUrls;
    href:                 string;
    id:                   string;
    images:               Image[];
    name:                 string;
    releaseDate:          Date;
    releaseDatePrecision: ReleaseDatePrecision;
    totalTracks:          number;
    type:                 AlbumTypeEnum;
    uri:                  string;
}

export enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
}

export interface Artist {
    externalUrls: ExternalUrls;
    href:         string;
    id:           string;
    name:         string;
    type:         ArtistType;
    uri:          string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface ExternalIDS {
    isrc: string;
}

export enum ItemType {
    Track = "track",
}
