import { useState, useRef, useEffect } from "react";
import edit_icon from "../assets/images/edit.png"
import { DisplayCard, SearchResultsList } from "../components";
import axios from "axios";

const DisplayCardList = ({ data }) => {
  return (
    <div className="mt_12 prompt_layout">
      {data.map((post, index) => (
        <DisplayCard key={index} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {

  const [tagValue, setTagValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [tags, setTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const dropdownRef = useRef(null);

  // fetch current location
  const [location, setLocation] = useState({ latitude: null, longitude: null, });
  const [locationStatus, setLocationStatus] = useState("pending");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus("success");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus("error");
        }
      );
    } else {
      setLocationStatus("error");
    }
  }, []);


  // fetch pharmacy list
  const [pharmacyList, setPharmacyList] = useState([]);
  const fetchPharmacyList = async () => {
    const tagsString = tags.join(","); 
    try {
      const response = await axios.post("http://localhost:9090/userApp/phList",{
        location: location,
        tags: tagsString,
      });

      setPharmacyList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  // tag suggestions
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9090/userApp/medicineList");
        const namesArray = response.data.map(item => item.name);
        setData(namesArray);
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchData();
  },[]);



  const onSearch = (e) => {
    e.preventDefault();
    fetchPharmacyList();
  };

  const addOrEditTag = (e) => {
    if (e.keyCode === 13 && tagValue) {
      if (isSimilarTag(tagValue)) {
        alert("Tag already exists");
        return;
      }

      if (editingIndex !== null) {
        const updatedTags = [...tags];
        updatedTags[editingIndex] = tagValue;
        setTags(updatedTags);
        setEditingIndex(null);
      } else {
        setTags([...tags, tagValue]);
      }
      setTagValue("");
      setSuggestedTags([]); // Clear suggestions after adding
    }
  };

  const deleteTag = (val) => {
    const remainingTags = tags.filter((t) => t !== val);
    setTags(remainingTags);
  };

  const isSimilarTag = (val) => {
    return tags.includes(val);
  };

  const startEditingTag = (index) => {
    setTagValue(tags[index]);
    setEditingIndex(index);
  };

  const onChange = (e) => {
    const value = e.target.value;
    setTagValue(value);

    if (value.length > 2) {
      const res = data.filter((x) =>
        x.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestedTags(res);
    } else {
      setSuggestedTags([]); // Clear suggestions if input is less than 3 characters
    }
  };

  const selectSuggestedTag = (tag) => {
    if (!isSimilarTag(tag)) {
      setTags([...tags, tag]); // Add the selected tag if it doesn't already exist
    }
    setTagValue(""); // Clear input after selection
    setSuggestedTags([]); // Clear suggestions after selection
  };

  // Hide suggestions when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestedTags([]);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="feed">
      <div className="content">
        {/* <h4 className="text-xl font-bold">
          Top Notch Services
        </h4> */}
        <div
          className="tagInput flex flex-wrap mb-4 relative"
          ref={dropdownRef}
        >
          {tags.map((item, index) => (
            <button
              key={index}
              className="flex items-center bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 my-1"
            >
              {item}
              <span
                className="ml-2 cursor-pointer text-red-500"
                onClick={() => deleteTag(item)}
              >
                X
              </span>
              <span
                className="ml-2 cursor-pointer"
                onClick={() => startEditingTag(index)}
              >
                <img src={edit_icon} alt="" className="w-4" />
              </span>
            </button>
          ))}

          <input
            type="text"
            placeholder="type and enter the medicine"
            value={tagValue}
            onChange={onChange}
            onKeyDown={addOrEditTag}
            className="border p-2 flex-1 search_input peer"
          />

          <button
            onClick={onSearch}
            className="bg-blue-500 text-white px-4 py-1 ml-2 rounded"
          >
            Submit
          </button>

          {/* Suggestions Dropdown */}
          {suggestedTags.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-2/5 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
              {suggestedTags.map((item, index) => (
                <li
                  key={index}
                  onClick={() => selectSuggestedTag(item)}
                  className="cursor-pointer hover:bg-blue-100 p-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Location Status */}
      <div className="rounded-md bg-gray-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            {locationStatus === "pending" && (
              <svg
                className="h-5 w-5 text-gray-400 animate-spin"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {locationStatus === "success" && (
              <svg
                className="h-5 w-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {locationStatus === "error" && (
              <svg
                className="h-5 w-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800">
              Location Status
            </h3>
            <div className="mt-2 text-sm text-gray-600">
              {locationStatus === "pending" &&
                "Detecting your location..."}
              {locationStatus === "success" &&
                "Location detected successfully"}
              {locationStatus === "error" && (
                <span className="text-red-600">
                  Unable to detect location. Please ensure location
                  access is enabled in your browser.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold">
          Here are the closets pharmacies with the medicine you need
        </h4>
        <DisplayCardList data={pharmacyList} />
      </div>
    </section>
  );
};

export default Feed;
