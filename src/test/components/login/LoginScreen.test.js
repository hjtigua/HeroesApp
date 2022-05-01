import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../Components/login/LoginScreen";
import { types } from "../../../types/types";

describe("Pruebas en loginScreen", () => {
  const contextValue = {
    dispatch: jest.fn(),
  };

  const historyMock = {
    replace: jest.fn(),
  };
  /*
    El 'LoginScreen' recibe por props directamente el history por eso se lo pueden inyectar
    directamente
*/
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de realizar el dispatch y la navegacion (replace)", () => {
    wrapper.find("button").simulate("click");

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Hector Javier Tigua Guerrero",
      },
    });

    expect(historyMock.replace).toHaveBeenCalled();

    localStorage.setItem("lastPath", "/dc");
    wrapper.find("button").simulate("click");
    expect(historyMock.replace).toHaveBeenCalledWith("/dc");
  });
});
