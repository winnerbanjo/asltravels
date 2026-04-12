"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getDefaultOption } from "@/lib/studio-config";
import type { StudioAction, StudioOption } from "@/lib/types";

type StudioState = {
  originalUrl: string | null;
  generatedUrl: string | null;
  action: StudioAction | null;
  option: StudioOption | null;
  imageId: string | null;
};

type StudioContextValue = StudioState & {
  resetSession: () => void;
  setOriginalUrl: (url: string) => void;
  setResult: (url: string, id: string) => void;
  setAction: (action: StudioAction) => void;
  setOption: (option: StudioOption) => void;
};

const initialState: StudioState = {
  originalUrl: null,
  generatedUrl: null,
  action: null,
  option: null,
  imageId: null,
};

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudioState>(initialState);

  const value = useMemo<StudioContextValue>(
    () => ({
      ...state,
      resetSession: () => setState(initialState),
      setOriginalUrl: (url) =>
        setState({
          originalUrl: url,
          generatedUrl: null,
          action: null,
          option: null,
          imageId: null,
        }),
      setResult: (url, id) =>
        setState((current) => ({
          ...current,
          generatedUrl: url,
          imageId: id,
        })),
      setAction: (action) =>
        setState((current) => ({
          ...current,
          action,
          option: getDefaultOption(action),
          generatedUrl: null,
          imageId: null,
        })),
      setOption: (option) =>
        setState((current) => ({
          ...current,
          option,
          generatedUrl: null,
          imageId: null,
        })),
    }),
    [state],
  );

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);

  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider.");
  }

  return context;
}
