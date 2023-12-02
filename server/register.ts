import pluginId from '../admin/src/pluginId'


export default ({ strapi }) => {
  strapi.customFields.register({
    name: 'location-picker',
    plugin: pluginId,
    type: 'json'
  })
};
