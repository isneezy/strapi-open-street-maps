import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('open-street-maps')
      .service('myService')
      .getWelcomeMessage();
  },
});
