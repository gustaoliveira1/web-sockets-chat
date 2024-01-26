import { App } from "./http/app";

function launch(): void {
  const port = parseInt(process.env.PORT as string || '3000', 10);
  const app = new App(port);

  app.start();
}

launch();
