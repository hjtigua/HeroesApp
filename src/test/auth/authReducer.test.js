import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  const initialState = {
    logged: false,
  };

  const authenticatedUser = {
    name: "Hector Javier Tigua G.",
    logged: true,
  };

  test("debe de retornar el estado por defecto", () => {
    /* 
      Cuando probamos los reducers los probamos como cualquier funcion
      Sin llamas al useReducer.
    */

    const state = authReducer(initialState, {});
    expect(initialState).toEqual(state);
  });

  test("Loggin debe de autenticar y colocar el name del usuario", () => {
    const state = authReducer(initialState, {
      type: types.login,
      payload: {
        name: "Hector Javier Tigua G.",
      },
    });
    expect(state).toEqual(authenticatedUser);
  });

  test("Logout debe de borrar el name del usuario y logged:false", () => {
    const state = authReducer(authenticatedUser, {
      type: types.logout,
    });
    expect(state).toEqual(initialState);
  });
});
