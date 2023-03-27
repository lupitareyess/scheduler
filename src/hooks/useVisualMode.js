import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode])


  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, - 1), mode]);
    }
    else {
      setHistory((prev) => [...prev, mode])
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1))
    }
  }

  //mode is always the last element in the history array
  return { mode: history[history.length - 1], transition, back };
};