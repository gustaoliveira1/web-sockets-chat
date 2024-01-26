import { Router } from 'express';

export const indexRoutes = Router();

indexRoutes.get('/', (req, res) => {
  res.sendFile('/index.html', {
    root: __dirname + '/../../../views',
  });
});
