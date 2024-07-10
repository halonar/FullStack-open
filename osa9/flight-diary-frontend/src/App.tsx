import { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { Weather, Visibility } from "./types";
import { apiBaseUrl } from "./constants";
import { DiaryEntry, NewDiaryEntry } from "./types";
import diaryService from "./services/diaries";
import Notification from "./Notification";
import React from "react";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Unknown);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Unknown);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [radioWeatherState, setRadioWeatherState] = useState("");
  const [radioVisibilityState, setRadioVisibilityState] = useState("");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaryEntries(diaries);
    };
    void fetchDiaryList();
  }, []);

  const submitNewDiaryEntry = async (values: NewDiaryEntry) => {
    try {
      const diaryEntry = await diaryService.create(values);
      setDiaryEntries(diaryEntries.concat(diaryEntry));
      setError("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    submitNewDiaryEntry({
      date,
      weather,
      visibility,
      comment,
    });

    //clear input
    setDate("");
    setWeather(Weather.Unknown);
    setRadioWeatherState("");
    setVisibility(Visibility.Unknown);
    setRadioVisibilityState("");
    setComment("");
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weatherValue = event.target.value as Weather;
    setWeather(weatherValue);
    setRadioWeatherState(weatherValue);
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const visibilityValue = event.target.value as Visibility;
    setVisibility(visibilityValue);
    setRadioVisibilityState(visibilityValue);
  };

  interface WeatherType {
    view: string;
    value: string;
  }

  const weatherOps = [
    { view: "Sunny", value: "sunny" },
    { view: "Rainy", value: "rainy" },
    { view: "Cloudy", value: "cloudy" },
    { view: "Stormy", value: "stormy" },
    { view: "Windy", value: "windy" },
  ];

  interface VisibilityType {
    view: string;
    value: string;
  }

  const visibilityOps: Array<VisibilityType> = [
    { view: "Great", value: "great" },
    { view: "Good", value: "good" },
    { view: "Ok", value: "ok" },
    { view: "Poor", value: "poor" },
  ];

  return (
    <div>
      {error && <Notification message={error} />}
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <label>
          date
          <input
            type="date"
            name="dday"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
        {/* <div>
          weather
          <input value={weather} onChange={handleWeatherChange} />
        </div> */}
        <div>
          weather
          {weatherOps.map(({ view: title, value: weather }: WeatherType) => {
            return (
              <React.Fragment key={title}>
                <input
                  type="radio"
                  value={weather}
                  name={weather}
                  checked={weather === radioWeatherState}
                  onChange={(e) => handleWeatherChange(e)}
                />
                {title}
              </React.Fragment>
            );
          })}
        </div>
        <div>
          visibility
          {visibilityOps.map(
            ({ view: title, value: visibility }: VisibilityType) => {
              return (
                <React.Fragment key={title}>
                  <input
                    type="radio"
                    value={visibility}
                    name={visibility}
                    checked={visibility === radioVisibilityState}
                    onChange={(e) => handleVisibilityChange(e)}
                  />
                  {title}
                </React.Fragment>
              );
            }
          )}
        </div>
        {/* <div>
          visibility
          <input value={visibility} onChange={handleVisibilityChange} />
        </div> */}
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>{" "}
      </form>{" "}
      <h2>Diary entries</h2>
      {diaryEntries.map((diaryEntry) => (
        <ul style={{ listStyle: "none" }} key={diaryEntry.id}>
          <div>
            <li>
              <h2>{diaryEntry.date}</h2>
            </li>
            <li> weather: {diaryEntry.weather}</li>
            <li> visibility: {diaryEntry.visibility}</li>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default App;
