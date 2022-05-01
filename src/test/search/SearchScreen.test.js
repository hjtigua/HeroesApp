import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../Components/search/SearchScreen";

/*
Aqui se reenderiza el "SearchScreen" desde el Router unicamente xq dentro utiliza hooks
para poder trabajar con rutas

*/

describe("Pruebas en SearchScren", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/search"]}>
      <Route path="/search" component={SearchScreen}></Route>
    </MemoryRouter>
  );

  test("debe de mostrarse correctamente con valores por defecto", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toMatchSnapshot(
      "Search a hero"
    );
  });

  test("debe de mostrar a batman y el input con el valor del query string", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen}></Route>
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar un error sino se encuentra el hero", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/search?q=ysiehdemorirnoquierosabernadadenadie"]}
      >
        <Route path="/search" component={SearchScreen}></Route>
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").text().trim()).toBe("Hero no found");
  });

  test("debe de llamar el push del history", () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/search?q=ysiehdemorirnoquierosabernadadenadie"]}
      >
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "searchString",
        value: "batman",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(history.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
