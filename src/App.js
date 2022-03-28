import SongCard from './components/SongCard';
import data from './assets/data'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        { data.map((it) => 
          <SongCard 
            image={it.album.images[1].url} 
            title={it.name} 
            singer={it.artists[0].name}
          />) 
        }
      </div>
    </div>
  );
}

export default App;
