import React, { useContext } from "react";
import { Audio } from "@remotion/media";
import { MuteSound } from "../../../engine";
import { asset } from "./assets";

export const Soundtrack: React.FC = () => {
  if (useContext(MuteSound)) return null;
  return (
    <Audio
      src={asset("audio/recitation.mp3")}
      volume={1.0}
    />
  );
};
