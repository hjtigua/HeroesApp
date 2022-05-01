import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../Components/heroes/HeroScreen";

describe("Pruebas en HeroScreen", () => {
  const historyMock = {
    push: jest.fn(),
    goBack: jest.fn(),
    length: 10,
  };

  test("debe de mostrar el componente redirect si no hay argumentos en la URL", () => {
    /* 
        Aqui utilizamos el "HeroScreen" directamente simular que no le lleguen los parametros al componente
        Se Podria poner "Route" en su lugar y no enviar los parametros esa seria la forma 'correcta de hacerlo' 
    */

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("debe de mostrar un hero si el parametro es valido", () => {
    /*
        Aqui se pone Route para poder enviar el path ( que va a renderizar HeroScreen )
    */

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path={"/hero/:heroeId"} component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test('debe de regresar a "/" con push', () => {
    const historyMock = {
      push: jest.fn(),
      goBack: jest.fn(),
      length: 1,
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path={"/hero/:heroeId"}
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(historyMock.push).toHaveBeenCalledWith("/");
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test("debe me regresar a la pantalla anterior goBack ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path={"/hero/:heroeId"}
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(historyMock.push).not.toHaveBeenCalledWith("/");
    expect(historyMock.goBack).toHaveBeenCalled();
  });

  test("debe de llamar el redirect si el hero o el hero no existe", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[
          "/hero/marvel-spiderlocolocolcorealmentecreiqueeramosamigos",
        ]}
      >
        <Route
          path={"/hero/:heroeId"}
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe("");
  });
});
