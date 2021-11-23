import { useState } from "react";
export const Singalefileupload = () => {
  const [file, setFile] = useState(null);
  function fileChange(e) {
    setFile(e.target.files[0]);
  }
  // here is submit file event
  async function summitFile(e) {
    e.preventDefault();
    const data = new FormData();
    const tesData = data.append("file", file);
    // console.log(Array.from(data));
    console.log(data);


    // fetch data 
    const respond = await fetch("http://localhost:800/single", {
      method: "POST",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      body:data,
    });

    const result =await respond.json();
    console.log(result);
  }
  return (
    <div>
      <form onSubmit={summitFile}>
        <label>Slelect Your file</label>
        <input type="file" name="file" onChange={fileChange} />
        <button>Upload</button>
      </form>
    </div>
  );
};
