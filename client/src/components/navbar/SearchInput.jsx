import Autosuggest from "react-autosuggest";

import axios from "axios";
import React from "react";
import "./SearchInput.scss";
import SearchListItem from "./SearchListItem";

function SearchInput() {
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("");

  const handleOnSearch = async (string, results) => {
    console.log(results);
    if (string === value) return;
    setValue(string);
    if (string.length < 1) setItems([]);
    try {
      const res = await axios.get(
        `movies${string.length > 0 ? "?q=" + string : ""}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Autosuggest
      inputProps={{
        value: value,
        onChange: (event, { newValue }) => {
          setValue(newValue);
        },
        placeholder: "Search for a movie",
      }}
      suggestions={items}
      onSuggestionsFetchRequested={({ value }) => {
        handleOnSearch(value);
      }}
      onSuggestionsClearRequested={() => {
        setItems([]);
      }}
      renderSuggestion={(text) => {
        return <SearchListItem item={text._id}>{text.title}</SearchListItem>;
      }}
      getSuggestionValue={(a) => {
        return a.title;
      }}
      alwaysRenderSuggestions
    />
  );
}

export default SearchInput;
