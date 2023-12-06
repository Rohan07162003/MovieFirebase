import logo from './logo.svg';
import './App.css';
import { Auth } from './component/auth';
import { db } from './config/firebase.js'
import { useEffect, useState } from 'react';
import { getDocs, collection,addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore"
function App() {
  const [movies, setMovies] = useState([]);
  const [newmovie,setNewmovie]=useState("");
  const [newmoviesales,setNewmoviesales]=useState(0);
  const [isnewmovieok,setisNewmovieok]=useState(false);
  const moviecollection = collection(db, "movies");
  const [updatedtitle,setUpdatedtitle]=useState("");
  const getmovielist = async () => {
    try {
      const data = await getDocs(moviecollection);
      const filtereddata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovies(filtereddata);
    } catch (err) {
      console.error(err);
    }

  }
  useEffect(() => {
    
    getmovielist();
  },[movies])

  const onsubmitmovie=async()=>{
    try{
      await addDoc(moviecollection,{title:newmovie,sales:newmoviesales,ok:isnewmovieok});
      getmovielist();
    }catch(err){
      console.error(err);
    }
  }
  const deletemovie=async(id)=>{
    const moviedoc=doc(db,"movies",id);
    await deleteDoc(moviedoc);
  }
  const updatemovietitle=async(id)=>{
    const moviedoc=doc(db,"movies",id);
    await updateDoc(moviedoc,{title:updatedtitle});
  }
  return (
    <div>
      <Auth />
      <div>
        <input placeholder="Movie Title" onChange={(e)=>{setNewmovie(e.target.value)}} />
        <input placeholder="Sales" type='number' onChange={(e)=>{setNewmoviesales(Number(e.target.value))}} />
        <input type='checkbox' checked={isnewmovieok} onChange={(e)=>{setisNewmovieok(e.target.checked)}} >
          
        </input>
        <label>OK?</label>
        <button onClick={onsubmitmovie}>Submit Movie</button>
      </div>
      <div>
        {movies.map((movie) => (
          <div>
            <h1 style={{ color: movie.ok ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.sales}</p>
            <button onClick={()=>deletemovie(movie.id)} >Delete Movie</button>
            <input placeholder='New Title' onChange={(e)=>{setUpdatedtitle(e.target.value)}} />
            <button onClick={()=>updatemovietitle(movie.id)} >Update Title</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
