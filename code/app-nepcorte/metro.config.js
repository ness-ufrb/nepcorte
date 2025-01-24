const { getDefaultConfig: getDefaultExpoConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultExpoConfig(__dirname);
  const {
    resolver: { sourceExts, assetExts }
  } = config;

  return {
    ...config,
    transformer: {
      ...config.transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();