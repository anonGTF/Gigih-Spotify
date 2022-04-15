export interface PlaylistResponse {
    collaborative: boolean;
    description:   string;
    externalUrls:  ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        any[];
    name:          string;
    owner:         Owner;
    primaryColor:  null;
    public:        boolean;
    snapshotID:    string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href:  null;
    total: number;
}

export interface Owner {
    displayName:  string;
    externalUrls: ExternalUrls;
    href:         string;
    id:           string;
    type:         string;
    uri:          string;
}

export interface Tracks {
    href:     string;
    items:    any[];
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
}
