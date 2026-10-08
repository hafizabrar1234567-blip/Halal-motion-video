import React from "react";
import { AbsoluteFill } from "remotion";
import { Finish, SceneTrack } from "../../../engine";
import "../brand/fonts";
import { QuranBackdrop } from "./components/QuranBackdrop";
import { Ayah8 } from "./scenes/Ayah8";
import { Ayah9 } from "./scenes/Ayah9";
import { Basmalah } from "./scenes/Basmalah";
import { Istiadha } from "./scenes/Istiadha";
import { Outro } from "./scenes/Outro";
import { Soundtrack } from "./Soundtrack";
import { SceneKey, timeline } from "./timeline";

const SCENE_VIEWS: Array<[SceneKey, React.FC]> = [
  ["istiadha", Istiadha],
  ["basmalah", Basmalah],
  ["ayah8", Ayah8],
  ["ayah9", Ayah9],
  ["outro", Outro],
];

export const Film: React.FC = () => (
  <AbsoluteFill>
    <QuranBackdrop />
    <SceneTrack timeline={timeline} views={SCENE_VIEWS} />
    <Finish />
    <Soundtrack />
  </AbsoluteFill>
);
