module.exports = {
  packagerConfig: {
    // ignore: ["^\\/node_modules$"],
    asar: true,
    icon:"./src/assets/images/login-logo2.png"
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

    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
