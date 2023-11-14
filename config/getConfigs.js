const GlobalConfig = require("../models/GlobalConfig");

module.exports = async () => {
  try {
    const configs = await GlobalConfig.findOne({
      customId: "some-global-configs",
    });
    return configs;
  } catch (error) {
    console.error("Error fetching global configs:", error);
    // Можете обработать ошибку здесь или пробросить ее выше
    throw error;
  }
};
