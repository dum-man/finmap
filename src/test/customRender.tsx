import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { RecoilRoot } from "recoil";
import ContextProvider from "../context/AppContext";
import matchMediaSetup from "./matchMediaSetup";
import i18n from "../test/i18nForTests";

matchMediaSetup();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <ContextProvider>
        <I18nextProvider i18n={i18n}>
          <RecoilRoot>{children}</RecoilRoot>
        </I18nextProvider>
      </ContextProvider>
    </MemoryRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
