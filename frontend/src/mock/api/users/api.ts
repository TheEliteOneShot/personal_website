import config from "@/config";

export default function (mock: any) {
  /*
    METHOD: GET
    PATH: /users
  */
  mock.onGet(config.routes.userApi.baseUrl).reply(200, {
    users: [{ id: 1, name: "John Smith" }],
  });

  /*
    METHOD: POST
    PATH: /users/create
  */
  mock
    .onPost(config.routes.userApi.createUser)
    .reply(201, "The user has been successfully created");
}
