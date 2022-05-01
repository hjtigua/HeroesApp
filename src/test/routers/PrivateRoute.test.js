import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en PrivateRoute", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };

  Storage.prototype.setItem = jest.fn();

  test("debe de mostrar el componente si esta autenticado y guardar local storage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Hola Hector Logged</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });

  test("debe de bloquear el componente si no esta autenticado ", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Hola Hector Logged</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
  });
});
