import React, { useState } from "react"
import firebase from "../services/firebase"

let storage = firebase.storage()
let storageRef = storage.ref("images/")
let database = firebase.database()

export default function ImageForm() {
  const [post, setPost] = useState({
    imgTitle: "",
    artist: "",
    detail: "",
    day: "",
  })
  const [image, setImage] = useState(undefined)
  const [filename, setFilename] = useState("")
  const [showImage, setShowImage] = useState(undefined)

  const handleImageTitle = (e) => {
    setPost({
      ...post,
      imgTitle: e.target.value,
    })
    // console.log(newPost.imgTitle)
  }

  const handleArtist = (e) => {
    setPost({
      ...post,
      artist: e.target.value,
    })
    // console.log(newPost.artist)
  }

  const handleDetail = (e) => {
    setPost({
      ...post,
      detail: e.target.value,
    })
    // console.log(newPost.detail)
  }

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setFilename(e.target.files[0].name)
      setShowImage(URL.createObjectURL(e.target.files[0]))
    }
  }
  async function upload(e) {
    try {
      console.log(filename)
      e.preventDefault()
      const data = new FormData()
      data.append("file", image)
      let imageRef = storageRef.child(filename)
      await imageRef.put(image)
      const imageUrl = await imageRef.getDownloadURL()
      const newKey = (await database.ref("/users/" + "meng").push()).key
      await database.ref("/users/" + "meng").update({
        [newKey]: {
          ...post,
          imgUrl: imageUrl,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <input type="file" onChange={selectImage}></input>
      <img src={showImage} width="300px" height="200px" alt="" />
      <button type="button" onClick={upload}>
        Upload
      </button>
      <br />
      <br />
      <br />
      <input
        type="text"
        placeholder="Title"
        onChange={handleImageTitle}
      ></input>
      <br />
      <br />
      <input type="text" placeholder="Artist" onChange={handleArtist}></input>
      <br />
      <br />
      <input
        type="text"
        placeholder="Detail"
        onChange={handleDetail}
        style={{ width: "450px", height: "300px" }}
      ></input>
    </div>
  )
}
