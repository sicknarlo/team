import { Request, Response, Router } from 'express';
import { PostRouter } from './post/post';
import { AuthorRouter } from './author/author';
import { APIDocsRouter } from './swagger';

const VERSION: string = 'v1';

const ROUTES: Array<Router> = [new PostRouter().getRouter(), new AuthorRouter().getRouter()];

const AppRouter: Router = Router();

ROUTES.forEach(router => AppRouter.use(`/api`, router));
AppRouter.use('/api/swagger', new APIDocsRouter().getRouter());

export default AppRouter;
