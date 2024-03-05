import { useState } from "react";
import { useSearchQuery } from "./petApiService";
import { useSelector, useDispatch } from "react-redux";
import {all} from "./searchParamsSlice";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // const [requestParams, setRequestParams] = useState({
  //   location: "",
  //   animal: "",
  //   breed: "",
  // });

  const dispatch = useDispatch();
  const requestParams = useSelector((state) => state.searchParamsSlice.value); //instead of writing above requestParams

  const adoptedPet = useSelector((state) => state.adoptedPetSlice.value); //this line can also be written as:
  //const store = useSelector((state) => state)
  //const adoptedPet = store.adoptedPet.value BUT we don't write this way because it will force this component to render every time store's any value changes

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  let {data:pets} = useSearchQuery(requestParams);
  pets = pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
