import {useState} from "react";
import {observer} from "mobx-react-lite";


import search_controller from "../../../shared/stores/search_controller.ts";
import {CartMusic} from "../../../components/ui/cartMusic";

import "../../../assets/css/search.css"

const Search = observer( () => {
  const [value,setValue] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");

  const {result,isLoading}= search_controller;

  const categories = [
    { id: 'name', label: 'Name' },
    { id: 'artist', label: 'Artist' },
    { id: 'genre', label: 'Genre' }
  ]

  const setNameHandler = (value) => {
    setValue(value);
  }

  const setCategoryHandler = (category) => {
    setSearchCategory(category);
  }

  const handleSubmitHandler = async e => {
    e.preventDefault();
    try {
      if(!value) return console.error("Please enter a value");
      await search_controller.search_by_category(value,searchCategory);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(result)
  return (
      <div className="search_page">

        <form className="search_container" action="" onSubmit={handleSubmitHandler}>
          <svg onClick={handleSubmitHandler} className="search_icon" focusable={false} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
            <path fill={"grey"} d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"></path>
          </svg>
          <input placeholder={"What u wanna search?"} type="name" name="name" value={value} onChange={(e) => setNameHandler(e.target.value)} />
        </form>

        <div className="categories_container">
          {categories.map(category => (
              <div
                  className={`category_block ${searchCategory === category.id ? 'active' : ''}`}
                  onClick={() => setCategoryHandler(category.id)}>
                <span>{category.label}</span>
              </div>
          ))}
        </div>



        <div className="search_result_container">
          {result.length > 0 && (
              <div className="search_result">
                {result.map((track) => (
                    <CartMusic key={track.id} props={track} playlist={result}/>
                ))}
              </div>
          )}
        </div>

        {!isLoading && result.length === 0 && value && (
            <span>Ничего не найдено</span>
        )}

      </div>
  )

})

export default Search;