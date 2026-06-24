import {observer} from "mobx-react-lite";
import {ApiUpload} from "../../shared/api/apiRequest";

const UploadMusic = observer(() => {


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    await ApiUpload("http://localhost:3003/test_multer", "POST", formData);
  }

  return (
      <form className="form-container-upload" onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div className="form-group">
          <input type="file" accept="image/*" className="form-control-avatar" name="avatar" id="avatar"/>
          <input type="file" accept=".mp3,audio/*" name="audio" id="audio" className="from-control-audio"/>
          <input type="text" name="name"/>
          <input type="text" name="description"/>
          <input type="text" name="genre"/>
          <input type="submit" value="Get me the stats"/>
        </div>
      </form>
  )
})

export default UploadMusic;