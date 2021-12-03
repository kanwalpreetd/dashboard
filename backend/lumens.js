import * as commonLumens from "../common/lumens.js";

let cachedData;

export const handler = function(req, res) {
  res.send(cachedData);
};

export function updateApiLumens() {
  return Promise.all([
    commonLumens.totalSupply(),
    commonLumens.circulatingSupply(),
    commonLumens.directDevelopmentAll(),
    commonLumens.distributionEcosystemSupport(),
    commonLumens.distributionUseCaseInvestment(),
    commonLumens.distributionUserAcquisition(),
  ])
    .then(function([
      totalCoins,
      availableCoins,
      directDevelopment,
      ecosystemSupport,
      useCaseInvestment,
      userAcquisition,
    ]) {
      var response = {
        updatedAt: new Date(),
        totalCoins,
        availableCoins,
        programs: {
          directDevelopment,
          ecosystemSupport,
          useCaseInvestment,
          userAcquisition,
        },
      };

      cachedData = response;
      console.log("/api/lumens data saved!");
    })
    .catch(function(err) {
      console.error(err);
      return err;
    });
}
