import { DiaryError } from "./types";

const Notification = (props: DiaryError) => {
  const errorStyle = {
    //color: "red",
    color: "rgb(255, 0, 0)",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (props.message === null) {
    return null;
  }

  //return <div className="error">{message}</div>;
  return <div style={errorStyle}>{props.message}</div>;
};

export default Notification;
