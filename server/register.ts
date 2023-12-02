export default ({ strapi }) => {
  strapi.customFields.register({
    name: 'location-picker',
    plugin: 'open-street-maps',
    type: 'json'
  })
};
