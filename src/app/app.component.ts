import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as prettyMilliseconds from 'pretty-ms';
interface IAlbum {
  id: number;
  title: string;
  artistId: number;
}
interface IGenre {
  id: number;
  name: string;
}
interface IPlaylist {
  id: number;
  name: string;
}
interface IPlaylistTrack {
  trackId: number;
  playlistId: number;
}
interface ITrack {
  id: number;
  name: string;
  albumId: number;
  mediaTypeId: number;
  genreId: number;
  composer: string;
  milliseconds: number;
  bytes: number;
  unitPrice: number;
}
interface ITableTrack {
  id: number;
  name: string;
  album: string;
  genre: string;
  length: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Angular Demo';
  totalTracks = 0;
  totallength = '';
  selectedPlaylist = '';
  genres: IGenre[] = [];
  albums: IAlbum[] = [];
  playlists: IPlaylist[] = [];
  tracks: ITrack[] = [];
  tableTracks: ITableTrack[] = [];
  genreSelected = '';
  trackSelected = '';
  enableNavEnablerButton = false;
  showTrackAddBar = false;
  showTrackSelection = false;
  enableAddButton = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getAllGenres();
    this.getAllAlbums();
    this.getAllPlaylists();
  }
  showTrackAddBarFunc(): void {
    this.showTrackAddBar = true
  }
  addTrackGenre(): void {
    if(this.genreSelected != ''){
      this.getTracksForGenres();
      this.showTrackSelection = true
    }
  }
  addTrack(): void {
    if(this.trackSelected != ''){
      this.enableAddButton = true
    }
  }
  addTrackToPlaylist() : void {
    this.http.post('http://localhost:5000/api/track', {"playlistId": this.selectedPlaylist, "trackid": +this.trackSelected})
    .subscribe(data => {
      this.getTracksForPlaylist();
      this.enableNavEnablerButton = false;
      this.showTrackAddBar = false;
      this.showTrackSelection = false;
      this.enableAddButton = false;
      console.log(data)
    })
  }
  getTracksForGenres(): void {
    this.http
    .get<ITrack[]>('http://localhost:5000/api/tracks?genreid='+this.genreSelected)
    .subscribe(result => this.tracks = result)
  }
  getAllGenres(): void {
    this.http
      .get<IGenre[]>('http://localhost:5000/api/genres')
      .subscribe((result) => (this.genres = result));
  }

  getAllAlbums(): void {
    this.http
      .get<IAlbum[]>('http://localhost:5000/api/albums')
      .subscribe((result) => (this.albums = result));
  }
  getAllPlaylists(): void {
    this.http
      .get<IPlaylist[]>('http://localhost:5000/api/playlists')
      .subscribe((result) => (this.playlists = result));
  }
  getTracksForPlaylist(): void {
    this.http
      .get<ITrack[]>(
        'http://localhost:5000/api/playlisttracks/' + this.selectedPlaylist
      )
      .subscribe(result => {
      this.tracks = result
      this.tableTracks = []
      this.tracks.forEach((x) =>
      this.tableTracks.push({
        id: x.id,
        name: x.name,
        genre: this.genres.find((y) => y.id == x.genreId)?.name as string,
        album: this.albums.find((y) => y.id == x.albumId)?.title as string,
        length: x.milliseconds,
      }))
      this.tableTracks.sort((a,b) =>  (a.name > b.name ? 1 : -1))
      this.totallength = prettyMilliseconds(this.tableTracks.map(x => x.length).reduce((sum, value) => sum + value))
      this.totalTracks = this.tableTracks.length
      this.enableNavEnablerButton = true
    })
  }
  deleteTrack(trackId: number): void{
    console.log("hello")
    this.http.delete('http://localhost:5000/api/track/?playlistid='+this.selectedPlaylist+"&trackid="+trackId).subscribe(x => {
      this.getTracksForPlaylist();
    })
    
  }
  convertMs(milliseconds: number): string {
    return prettyMilliseconds(milliseconds)
  }
}
