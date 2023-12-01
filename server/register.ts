import pluginId from '../admin/src/pluginId'
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'location-picker',
    plugin: pluginId,
    type: 'json'
  })
};
