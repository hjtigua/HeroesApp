import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { Navbar } from "../../Components/ui/NavBar";
import { types } from "../../types/types";

describe("pruebas en Navbar", () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Pedro Ardimala",
    },
  };

  /*
El nav usa el history desde el 'useHistory' por eso se debe de inyectar por
medio del Router
*/
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Pedro Ardimala");
  });

  test("debe de llamar el logout y el usar el history", () => {
    wrapper.find("button").simulate("click");
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
