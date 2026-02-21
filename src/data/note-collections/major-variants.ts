import type { ChordCollection } from "../../types/note-collections.d.ts";

const major: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "M",
  names: ["M", "maj", "Major", "Major Triad", "Δ"],
  intervals: ["1", "3", "5"],
  integers: [0, 4, 7],
  type: ["major", "chord", "arpeggio", "triad"],
  characteristics: ["stable", "happy", "bright", "the most basic major chord"],
  pattern: ["major third", "minor third"],
  patternShort: ["M3", "m3"],
} as const;

const major6: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "6",
  names: ["6", "M6", "maj6", "Major 6th", "Major Sixth"],
  intervals: ["1", "3", "5", "6"],
  integers: [0, 4, 7, 9],
  type: ["major", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "stable",
    "happy",
    "bright",
    "sweet",
    "melodic",
    "less tension than a major 7th",
    "common in early jazz and pop",
  ],
  pattern: ["major third", "minor third", "major second"],
  patternShort: ["M3", "m3", "M2"],
} as const;

const major7: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "M7",
  names: ["M7", "maj7", "Major 7th", "Major Seventh", "Δ7"],
  intervals: ["1", "3", "5", "7"],
  integers: [0, 4, 7, 11],
  type: ["major", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "stable",
    "happy",
    "bright",
    "sophisticated",
    "lush",
    "jazzy and sophisticated",
  ],
  pattern: ["major third", "minor third", "major third"],
  patternShort: ["M3", "m3", "M3"],
} as const;

const major9: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "M9",
  names: ["M9", "maj9", "Major 9th", "Major Ninth", "Δ9"],
  intervals: ["1", "3", "5", "7", "9"],
  integers: [0, 4, 7, 11, 14],
  type: ["major", "chord", "arpeggio", "pentad"],
  characteristics: [
    "stable",
    "happy",
    "bright",
    "colorful",
    "rich",
    "airy",
    "adds a layer of complexity and color",
  ],
  pattern: ["major third", "minor third", "major third", "minor third"],
  patternShort: ["M3", "m3", "M3", "m3"],
} as const;

const majorAdd9: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "add9",
  names: ["add9", "maj(add9)", "M(add9)", "Major add 9"],
  intervals: ["1", "3", "5", "9"],
  integers: [0, 4, 7, 14],
  type: ["major", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "stable",
    "happy",
    "bright",
    "colorful",
    "open",
    "airy",
    "different from a major 9th as it lacks the 7th",
  ],
  pattern: ["major third", "minor third", "perfect fifth"],
  patternShort: ["M3", "m3", "P5"],
} as const;

const major6Add9: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "6/9",
  names: ["6/9", "M6/9", "maj6/9", "Major 6/9", "6add9", "Major add 6 add 9"],
  intervals: ["1", "3", "5", "6", "9"],
  integers: [0, 4, 7, 9, 14],
  type: ["major", "chord", "arpeggio", "pentad"],
  characteristics: [
    "stable",
    "happy",
    "bright",
    "sweet",
    "melodic",
    "colorful",
    "rich",
    "open",
    "very lush and rich",
    "alternative to a major 7th chord",
    "popular in jazz piano voicings",
  ],
  pattern: ["major third", "minor third", "major second", "perfect fourth"],
  patternShort: ["M3", "m3", "M2", "P4"],
} as const;

export const _majorVariants = {
  major,
  major6,
  major7,
  major9,
  majorAdd9,
  major6Add9,
} as const;

export type MajorVariantKey = keyof typeof _majorVariants;

export const majorVariants: Record<MajorVariantKey, ChordCollection> =
  _majorVariants;
