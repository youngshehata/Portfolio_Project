// ErrorPage.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let message = "Something went wrong.";

  // Nice handling for route errors
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Oops!</h1>
      <p>{message}</p>
    </div>
  );
}
