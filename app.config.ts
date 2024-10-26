import { ConfigContext, ExpoConfig } from 'expo/config'

export default function ({ config }: ConfigContext): ExpoConfig {
  return {
    ...config,
    "name": "Product Manager",
    "slug": "product_manager",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "cm.danofred.product_manager",
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-image-picker",
        {
          photosPermission: "PERMISSION"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
