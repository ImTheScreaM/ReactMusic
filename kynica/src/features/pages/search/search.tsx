import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { useRootContext } from "../../../shared/di/rootStoreContext.tsx";
import VirtualizationMusic from "../../../components/UX/VirtualizationMusic.tsx";

import "../../../assets/css/search.css";

const Search = observer(() => {
  const [searchCategory, setSearchCategory] = useState("name");
  const inputSearchRef = useRef(null);
  const { searchStore } = useRootContext();

  useEffect(() => {
    if (!searchStore.searchLoading) {
      inputSearchRef.current?.focus();
    }
  }, [searchStore.searchLoading]);

  const categories = [
    { id: "name", label: "Name" },
    { id: "artist", label: "Artist" },
    { id: "genre", label: "Genre" },
  ];

  const setCategoryHandler = (category) => {
    setSearchCategory(category);
    setTimeout(() => inputSearchRef.current?.focus(), 0);
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!inputSearchRef.current.value)
        return toast.error("Please enter a value");
      await searchStore.search_by_category(
        inputSearchRef.current.value,
        searchCategory,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search_page">
      <form className="search_container" onSubmit={handleSubmitHandler}>
        <button type="submit" className="search_button">
          <svg
            className="search_icon"
            focusable={false}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 30 30"
          >
            <path
              fill={"grey"}
              d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"
            ></path>
          </svg>
        </button>

        <input
          placeholder={"What u wanna search?"}
          type="text"
          name="name"
          ref={inputSearchRef}
        />
      </form>

      <div className="categories_container">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={`category_block ${searchCategory === category.id ? "active" : ""}`}
            onClick={() => setCategoryHandler(category.id)}
          >
            <span>{category.label}</span>
          </button>
        ))}
      </div>
      <div className="search_result_container">
        {searchStore.searchLoading ? (
          <div></div>
        ) : (
          <div>
            {inputSearchRef.current &&
              inputSearchRef.current.value &&
              searchStore.result.artistInformation && (
                <div>
                  <NavLink
                    to={`/artist/${searchStore.result.artistInformation[0].id}`}
                    className="search-result-author"
                  >
                    <img
                      src={`${process.env.REACT_APP_URL_SERVER}${searchStore.result.artistInformation[0].urlAvatar}`}
                      alt="artist_avatar"
                      className="search-profile-avatar"
                    />
                    <span>{searchStore.result.artistInformation[0].name}</span>
                  </NavLink>
                </div>
              )}
          </div>
        )}

        {searchStore.searchLoading ? (
          <div></div>
        ) : (
          <div>
            {inputSearchRef.current &&
              inputSearchRef.current.value &&
              searchStore.result && (
                <div className="search_result">
                  <VirtualizationMusic tracks={searchStore.result.music} />
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
});

export default Search;
