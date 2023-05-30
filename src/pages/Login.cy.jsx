import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { getStore } from "../../src/store";
import { store } from "../store/store";
import Login from "./Login";

Cypress.Commands.add("mount", (options = {}) => {
  const { reduxStore = getStore(), ...mountOptions } = options;

  const wrapped = (
    <MemoryRouter {...routerProps}>
      <Provider store={store}>
        <Login />
      </Provider>
    </MemoryRouter>
  );

  return mount(wrapped, mountOptions);
});
