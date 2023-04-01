import { atom } from "jotai";

export const loadingPoemAtom = atom(false);
export const loadingImageAtom = atom(false);

export const requestErrorAtom = atom(false);

export const poemShowAtom = atom(false);
export const poemTextAtom = atom("");
export const poemImageAtom = atom("loader.gif");
