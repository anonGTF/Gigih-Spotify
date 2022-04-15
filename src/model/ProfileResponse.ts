export interface ProfileResponse {
    displayName:  string;
    externalUrls: ExternalUrls;
    followers:    Followers;
    href:         string;
    id:           string;
    images:       any[];
    type:         string;
    uri:          string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href:  null;
    total: number;
}
