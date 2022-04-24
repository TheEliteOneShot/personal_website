import mockUsersApi from "./users/api";

const injectMock = (mock: any) => {
  // Put all of the mock API routes here
  mockUsersApi(mock);
};

export default injectMock;
