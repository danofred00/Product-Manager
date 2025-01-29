import { ConfigContext, ExpoConfig } from 'expo/config'

export default function ({ config }: ConfigContext): ExpoConfig {
  return {
    ...config,
    "name": "Store Manager",
    "slug": "product_manager",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./src/assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,  
      "bundleIdentifier": "cm.danofred.product-manager"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "cm.danofred.product_manager",
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./src/assets/images/favicon.png"
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
