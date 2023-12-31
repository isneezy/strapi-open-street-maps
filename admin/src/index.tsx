import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import getTrad from './utils/getTrad';

const name = pluginPkg.strapi.displayName;
const description = pluginPkg.strapi.description

export default {
  register(app: any) {
    app.customFields.register({
      name: 'location-picker',
      pluginId,
      type: 'json',
      inputSize: {
        default: 12,
        isResizable: false
      },
      intlLabel: {
        id: getTrad('input.label'),
        defaultMessage: name
      },
      intlDescription: {
        id: getTrad('input.description'),
        defaultMessage: 'Pick your location'
      },
      icon: PluginIcon,
      components: {
        Input: async () => import(
           /* webpackChunkName: "input-component" */ './components/Input'
        )
      },
      options: {
        advanced: [
          {
            name: 'optionsDefaultLat',
            type: 'string',
            intlLabel: {
              id: getTrad('attribute.item.defaultLat'),
              defaultMessage: 'Default latitude'
            }
          },
          {
            name: 'optionsDefaultLng',
            type: 'string',
            intlLabel: {
              id: getTrad('attribute.item.defaultLng'),
              defaultMessage: 'Default longitude'
            }
          },
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings'
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                intlDescription: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ]
          }
        ]
      }
    })

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
      description
    };
    app.registerPlugin(plugin);
  },

  bootstrap(app: any) { },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
