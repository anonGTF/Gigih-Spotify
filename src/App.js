import SongCard from './components/SongCard';
import data from './assets/data'
import './App.css';

function App() {
  return (
    <div className="App">
      <SongCard 
        image={data.album.images[1].url} 
        title={data.name} 
        singer={data.artists[0].name}
      />
    </div>
  );
}

export default App;
