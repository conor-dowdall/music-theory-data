import { getIntegerNotation } from "../src/music-theory-data-utils";

describe("getIntegerNotation", () => {
  it("should return the correct integer notation for natural notes", () => {
    expect(getIntegerNotation("C")).toBe(0);
    expect(getIntegerNotation("c")).toBe(0);
    expect(getIntegerNotation("D")).toBe(2);
    expect(getIntegerNotation("d")).toBe(2);
    expect(getIntegerNotation("E")).toBe(4);
    expect(getIntegerNotation("e")).toBe(4);
    expect(getIntegerNotation("F")).toBe(5);
    expect(getIntegerNotation("f")).toBe(5);
    expect(getIntegerNotation("G")).toBe(7);
    expect(getIntegerNotation("g")).toBe(7);
    expect(getIntegerNotation("A")).toBe(9);
    expect(getIntegerNotation("a")).toBe(9);
    expect(getIntegerNotation("B")).toBe(11);
    expect(getIntegerNotation("b")).toBe(11);
  });

  it("should return the correct integer notation for sharp notes using '#'", () => {
    expect(getIntegerNotation("B#")).toBe(0);
    expect(getIntegerNotation("b#")).toBe(0);
    expect(getIntegerNotation("C#")).toBe(1);
    expect(getIntegerNotation("c#")).toBe(1);
    expect(getIntegerNotation("D#")).toBe(3);
    expect(getIntegerNotation("d#")).toBe(3);
    expect(getIntegerNotation("F#")).toBe(6);
    expect(getIntegerNotation("f#")).toBe(6);
    expect(getIntegerNotation("G#")).toBe(8);
    expect(getIntegerNotation("g#")).toBe(8);
    expect(getIntegerNotation("A#")).toBe(10);
    expect(getIntegerNotation("a#")).toBe(10);
  });

  it("should return the correct integer notation for flat notes using 'b'", () => {
    expect(getIntegerNotation("Db")).toBe(1);
    expect(getIntegerNotation("db")).toBe(1);
    expect(getIntegerNotation("Eb")).toBe(3);
    expect(getIntegerNotation("eb")).toBe(3);
    expect(getIntegerNotation("Fb")).toBe(4);
    expect(getIntegerNotation("fb")).toBe(4);
    expect(getIntegerNotation("Gb")).toBe(6);
    expect(getIntegerNotation("gb")).toBe(6);
    expect(getIntegerNotation("Ab")).toBe(8);
    expect(getIntegerNotation("ab")).toBe(8);
    expect(getIntegerNotation("Bb")).toBe(10);
    expect(getIntegerNotation("bb")).toBe(10);
    expect(getIntegerNotation("Cb")).toBe(11);
    expect(getIntegerNotation("cb")).toBe(11);
  });

  it("should return the correct integer notation for sharp notes using '♯'", () => {
    expect(getIntegerNotation("B♯")).toBe(0);
    expect(getIntegerNotation("b♯")).toBe(0);
    expect(getIntegerNotation("C♯")).toBe(1);
    expect(getIntegerNotation("c♯")).toBe(1);
    expect(getIntegerNotation("D♯")).toBe(3);
    expect(getIntegerNotation("d♯")).toBe(3);
    expect(getIntegerNotation("F♯")).toBe(6);
    expect(getIntegerNotation("f♯")).toBe(6);
    expect(getIntegerNotation("G♯")).toBe(8);
    expect(getIntegerNotation("g♯")).toBe(8);
    expect(getIntegerNotation("A♯")).toBe(10);
    expect(getIntegerNotation("a♯")).toBe(10);
  });

  it("should return the correct integer notation for flat notes using '♭'", () => {
    expect(getIntegerNotation("D♭")).toBe(1);
    expect(getIntegerNotation("d♭")).toBe(1);
    expect(getIntegerNotation("E♭")).toBe(3);
    expect(getIntegerNotation("e♭")).toBe(3);
    expect(getIntegerNotation("F♭")).toBe(4);
    expect(getIntegerNotation("f♭")).toBe(4);
    expect(getIntegerNotation("G♭")).toBe(6);
    expect(getIntegerNotation("g♭")).toBe(6);
    expect(getIntegerNotation("A♭")).toBe(8);
    expect(getIntegerNotation("a♭")).toBe(8);
    expect(getIntegerNotation("B♭")).toBe(10);
    expect(getIntegerNotation("b♭")).toBe(10);
    expect(getIntegerNotation("C♭")).toBe(11);
    expect(getIntegerNotation("c♭")).toBe(11);
  });

  it("should handle double sharps and flats (if included in data)", () => {
    expect(getIntegerNotation("Dbb")).toBe(0);
    expect(getIntegerNotation("D♭♭")).toBe(0);
    expect(getIntegerNotation("B##")).toBe(1);
    expect(getIntegerNotation("b##")).toBe(1);
    expect(getIntegerNotation("C##")).toBe(2);
    expect(getIntegerNotation("c##")).toBe(2);
    expect(getIntegerNotation("D##")).toBe(4);
    expect(getIntegerNotation("d##")).toBe(4);
    expect(getIntegerNotation("Cbb")).toBe(10);
    expect(getIntegerNotation("cbb")).toBe(10);
  });

  it("should return undefined for invalid note names", () => {
    expect(getIntegerNotation("H")).toBeUndefined();
    expect(getIntegerNotation("Cx")).toBeUndefined();
    expect(getIntegerNotation("Dbbbb")).toBeUndefined();
    expect(getIntegerNotation("")).toBeUndefined();
    expect(getIntegerNotation(" ")).toBeUndefined();
  });
});
