Wrote the backend in FASTAPI.
Wrote the frontend in VueJS3 with a Premium Template.
Custom created a mini identity server integration with backend and frontend.
Docker Ready, and also added a Reverse Proxy to hide the Backend for a potential docker implementation.

Personally wrote the Frontend and Backend implementation including:

- Account Creation
- Login
- Authentication
- Authorization
- Access Token
- Refresh Token
- Database Integration

- For example, custom wrote the *frontend/src/composable/useApi.ts* in JavaScript. This AXIOS implementation handles the API calls when the Access Token has expired to request a new Access Token using the Refresh Token from the Fast API backend. It also brilliantly uses the store in VueJS3, specifically Pinia with Hot Module Replacement built on JavaScript promises. If an API call receives a notification from the backend that it's access token has expired it will wait on a 100ms refresh interval via a boolean variable. When the hot module replaced variable is set to true because a new access token has been received from the FastAPI backend using a Refresh Token and the new Access Token put in the user storage, the original denied API call will resend the original API request using the new access token from the user storage resulting in a successful request. Ultimately, this results in a very smooth user experience with very limited complexity.

Customized several VueJS3 templates.
