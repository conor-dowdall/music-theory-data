import type { StringInstrumentTuning } from "../../types/string-instruments.d.ts";

const guitarStandardE: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Standard E",
  names: ["Standard E", "E Standard", "Standard Guitar Tuning"],
  openNoteNames: ["E", "A", "D", "G", "B", "E"],
  openMidiNotes: [40, 45, 50, 55, 59, 64],
} as const;

const guitarDadgad: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "DADGAD",
  names: ["DADGAD", "D Suspended", "Celtic Tuning"],
  openNoteNames: ["D", "A", "D", "G", "A", "D"],
  openMidiNotes: [38, 45, 50, 55, 57, 62],
} as const;

const guitarDropD: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Drop D",
  names: ["Drop D", "DADGBE"],
  openNoteNames: ["D", "A", "D", "G", "B", "E"],
  openMidiNotes: [38, 45, 50, 55, 59, 64],
} as const;

const guitarDoubleDropD: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Double Drop D",
  names: ["Double Drop D", "DADGBD"],
  openNoteNames: ["D", "A", "D", "G", "B", "D"],
  openMidiNotes: [38, 45, 50, 55, 59, 62],
} as const;

const guitarHalfStepDown: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Half Step Down",
  names: ["Half Step Down", "E Flat Standard", "Eb Standard"],
  openNoteNames: ["E♭", "A♭", "D♭", "G♭", "B♭", "E♭"],
  openMidiNotes: [39, 44, 49, 54, 58, 63],
} as const;

const guitarWholeStepDown: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Whole Step Down",
  names: ["Whole Step Down", "D Standard"],
  openNoteNames: ["D", "G", "C", "F", "A", "D"],
  openMidiNotes: [38, 43, 48, 53, 57, 62],
} as const;

const guitarOpenG: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Open G",
  names: ["Open G", "DGDGBD"],
  openNoteNames: ["D", "G", "D", "G", "B", "D"],
  openMidiNotes: [38, 43, 50, 55, 59, 62],
} as const;

const guitarOpenGMinor: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Open G minor",
  names: ["Open G minor", "DGDGBbD"],
  openNoteNames: ["D", "G", "D", "G", "B♭", "D"],
  openMidiNotes: [38, 43, 50, 55, 58, 62],
} as const;

const guitarOpenD: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Open D",
  names: ["Open D", "DADF#AD", "Vestapol"],
  openNoteNames: ["D", "A", "D", "F♯", "A", "D"],
  openMidiNotes: [38, 45, 50, 54, 57, 62],
} as const;

const guitarOpenDMinor: StringInstrumentTuning = {
  instrument: "guitar",
  primaryName: "Open D minor",
  names: ["Open D minor", "DADFAD"],
  openNoteNames: ["D", "A", "D", "F", "A", "D"],
  openMidiNotes: [38, 45, 50, 53, 57, 62],
} as const;

const _guitarTunings = {
  guitarStandardE,
  guitarHalfStepDown,
  guitarWholeStepDown,
  guitarDropD,
  guitarDoubleDropD,
  guitarDadgad,
  guitarOpenG,
  guitarOpenGMinor,
  guitarOpenD,
  guitarOpenDMinor,
} as const;

export type GuitarTuningKey = keyof typeof _guitarTunings;

export type GuitarTunings = Record<GuitarTuningKey, StringInstrumentTuning>;

export const guitarTunings: GuitarTunings = _guitarTunings;

export const guitarTuningKeys: readonly GuitarTuningKey[] = Object.keys(
  _guitarTunings,
) as readonly GuitarTuningKey[];

export interface GuitarTuningGroup {
  displayName: string;
  tuningKeys: readonly GuitarTuningKey[];
}

const standardGuitarTuningGroup: GuitarTuningGroup = {
  displayName: "Standard",
  tuningKeys: [
    "guitarStandardE",
    "guitarHalfStepDown",
    "guitarWholeStepDown",
  ],
} as const;

const dropGuitarTuningGroup: GuitarTuningGroup = {
  displayName: "Drop",
  tuningKeys: ["guitarDropD", "guitarDoubleDropD"],
} as const;

const modalGuitarTuningGroup: GuitarTuningGroup = {
  displayName: "Modal",
  tuningKeys: ["guitarDadgad"],
} as const;

const openGuitarTuningGroup: GuitarTuningGroup = {
  displayName: "Open",
  tuningKeys: [
    "guitarOpenG",
    "guitarOpenGMinor",
    "guitarOpenD",
    "guitarOpenDMinor",
  ],
} as const;

const _guitarTuningGroups = {
  standard: standardGuitarTuningGroup,
  drop: dropGuitarTuningGroup,
  modal: modalGuitarTuningGroup,
  open: openGuitarTuningGroup,
} as const;

export type GuitarTuningGroupKey = keyof typeof _guitarTuningGroups;

export type GuitarTuningGroups = Record<
  GuitarTuningGroupKey,
  GuitarTuningGroup
>;

export const guitarTuningGroups: GuitarTuningGroups = _guitarTuningGroups;
