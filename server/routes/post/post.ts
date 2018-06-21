import { Request, Response, Router } from 'express';
import asyncMiddleware from '../../utils/asyncMiddleware';
import { Post } from '../../models/post/model';
import { Author } from '../../models/author/model';

export class PostRouter {

    private router: Router = Router();

    getRouter(): Router {

      /**
       * @swagger
       * /api/post:
       *   get:
       *     tags:
       *      - Post
       *     description:
       *      List of all Posts for a given author.
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Posts
       *       400:
       *         description: Invalid request
       *       403:
       *         description: Forbidden
       */
      this.router.get('/post', asyncMiddleware(async (request: Request, response: Response) => {

        const posts = await Post.find({}).populate('author').exec();

        response.json(posts)
      }));

      /**
       * @swagger
       * /api/post:
       *   post:
       *     tags:
       *      - Post
       *     description:
       *      Create new post for a author.
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Post
       *       400:
       *         description: Invalid request
       *       403:
       *         description: Forbidden
       */
      this.router.post('/post', asyncMiddleware(async (request: Request, response: Response) => {

        let data = request.body;
        let author = await Author.findOne().exec();

        data.author = author._id;

        const post = await Post.create(data);

        response.json(post)
      }));

      return this.router;
    }
  }
