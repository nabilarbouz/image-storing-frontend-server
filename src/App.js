import './App.css';

import {useState} from 'react';
import axios from 'axios';


async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description);

  const result = await axios.post("http://internal-i-backend-LB-1240427538.us-east-1.elb.amazonaws.com/images", formData,
   {headers: {'Content-Type': 'multipart/form-data'}});
   return result.data;
}

function App() {

  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const submit = async event => {
    event.preventDefault();
    const result = await postImage({image: file, description});
    setImages([result.imagePath, ...images]);
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file);
  }

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={submit}>
          <input
            onChange={fileSelected} 
            type="file"
            className="form-control mt-2"
           ></input>
          <input 
            className="form-control mt-2"
            placeholder="File description"
            value={description} 
            onChange={e => setDescription(e.target.value)}
            type="text" >

          </input>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>

      {images.map( image => (
        <div className="card" style={{width: "18rem"}}>
        <img src={image} class="card-img-top" alt="helloworld"></img>
        <div className="card-body">
          <h5 className="card-title">Image from S3</h5>
          <p className="card-text">This image was pulled from an S3 bucket</p>
        </div>
      </div>
      ))}


    </div>
  );
}

export default App;
