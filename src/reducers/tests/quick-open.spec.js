// @flow
declare var describe: (name: string, func: () => void) => void;
declare var test: (desc: string, func: () => void) => void;
declare var expect: (value: any) => any;

import update, {
  State,
  getQuickOpenEnabled,
  getQuickOpenQuery,
  getQuickOpenType
} from "../quick-open";
import {
  setQuickOpenQuery,
  openQuickOpen,
  closeQuickOpen
} from "../../actions/quick-open";

describe("quickOpen reducer", () => {
  test("initial state", () => {
    const state = update(undefined, { type: "FAKE" });
    expect(getQuickOpenQuery({ quickOpen: state })).toEqual("");
    expect(getQuickOpenType({ quickOpen: state })).toEqual("sources");
  });

  test("opens the quickOpen modal", () => {
    const state = update(State(), openQuickOpen());
    expect(getQuickOpenEnabled({ quickOpen: state })).toEqual(true);
  });

  test("closes the quickOpen modal", () => {
    let state = update(State(), openQuickOpen());
    expect(getQuickOpenEnabled({ quickOpen: state })).toEqual(true);
    state = update(State(), closeQuickOpen());
    expect(getQuickOpenEnabled({ quickOpen: state })).toEqual(false);
  });

  test("leaves query alone on open if not provided", () => {
    const state = update(State(), openQuickOpen());
    expect(getQuickOpenQuery({ quickOpen: state })).toEqual("");
    expect(getQuickOpenType({ quickOpen: state })).toEqual("sources");
  });

  test("set query on open if provided", () => {
    const state = update(State(), openQuickOpen("@"));
    expect(getQuickOpenQuery({ quickOpen: state })).toEqual("@");
    expect(getQuickOpenType({ quickOpen: state })).toEqual("functions");
  });

  test("clear query on close", () => {
    const state = update(State(), closeQuickOpen());
    expect(getQuickOpenQuery({ quickOpen: state })).toEqual("");
    expect(getQuickOpenType({ quickOpen: state })).toEqual("sources");
  });

  test("sets the query to the provided string", () => {
    const state = update(State(), setQuickOpenQuery("test"));
    expect(getQuickOpenQuery({ quickOpen: state })).toEqual("test");
    expect(getQuickOpenType({ quickOpen: state })).toEqual("sources");
  });
});
