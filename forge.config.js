module.exports = {
  packagerConfig: {
    // ignore: ["^\\/node_modules$"],
    asar: true,
    icon: "./src/assets/images/login-logo2",
  },
  rebuildConfig: {},
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: "./src/assets/images/login-logo2.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./src/assets/images/app-logo.icns",
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
