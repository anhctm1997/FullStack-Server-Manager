import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
const SearchInput = ({ search, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(type);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (!searchValue.trim()) {
      return;
    }
    console.log(list);
    const fecth = async () => {
      const res = await dispatch(search(searchValue));
      if (!res.error) setList(res.payload.data);
    };
    fecth();
  }, [searchValue]);

  return (
    <Autocomplete
      options={list}
      inputValue={searchValue}
      getOptionLabel={(option) =>
        type === "servers" ? option.name : option.username
      }
      onChange={(e, v) => setSearchValue(v)}
      style={{ width: 300 }}
      noOptionsText={"No available"}
      renderOption={(props, option) => (
        <Box key={option._id}>
          <Button
            fullWidth
            color="primary"
            onClick={() => navigate(`/${type}/${option._id}`)}
          >
            {type === "servers" ? option.name : option.username}
          </Button>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={"Search"}
          onChange={({ target }) => setSearchValue(target.value)}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default SearchInput;
