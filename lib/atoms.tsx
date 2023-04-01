import { atom } from "jotai";

export const loadingPoemAtom = atom(false);

export const ttsVoices = atom(undefined);

export const requestErrorAtom = atom(false);

export const poemShowAtom = atom(false);
export const poemTextAtom = atom("");
export const poemImageAtom = atom("loader.gif");
