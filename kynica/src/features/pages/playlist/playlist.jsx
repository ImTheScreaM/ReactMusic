import "../../../assets/css/playlist.css"

const Playlist = () => {

  const TEST_PLAYLIST = [
    {
      id:1,
      name:"TEST1",
      avatar:"https://i.imgur.com/4Yt4B94.jpeg"
    },
    {
      id:2,
      name:"TEST2",
      avatar:"https://i.imgur.com/4Yt4B94.jpeg"
    }
  ]


  return (
      <div className="playlist_container">
        {TEST_PLAYLIST.map(item => (
            <div className="playlist_item" key={item.id}>
              <div className="playlist_img">
                <img className="w-20 h-20" src={item.avatar} alt={"Error"}/>
              </div>
              <div className="playlist_info">
                <span className="playlist_name">
                  {item.name}
                </span>
              </div>
            </div>
        ))}
      </div>
  )
}


export default Playlist;