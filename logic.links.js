module.exports = {
    run: function () {

        const linkFromFirstMine = Game.rooms['W1N6'].lookForAt('structure', 39,40 )[0];
        const linkFromSecondMine = Game.rooms['W1N6'].lookForAt('structure', 44,28 )[0];
        const linkToStorageW1N6 = Game.rooms['W1N6'].lookForAt('structure', 21, 17)[0];
        const linkToUpgraderW1N6 = Game.rooms['W1N6'].lookForAt('structure', 17, 9)[0];

        const linkFromFirstMineW2N6 = Game.rooms['W2N6'].lookForAt('structure', 4,13 )[0];
        const linkFromSecondMineW2N6 = Game.rooms['W2N6'].lookForAt('structure', 45,28 )[0];
        const linkToStorageW2N6 = Game.rooms['W2N6'].lookForAt('structure', 25, 29)[0];

        const linkFromFirstMineW1N7 = Game.rooms['W1N7'].lookForAt('structure', 32,33 )[0];
        const linkFromSecondMineW1N7 = Game.rooms['W1N7'].lookForAt('structure', 27,11 )[0];
        const linkToStorageW1N7 = Game.rooms['W1N7'].lookForAt('structure', 24, 23)[0];
        const linkFromFirstMineW1N7_2 = Game.rooms['W1N7'].lookForAt('structure', 25, 12)[0];

        let linkFromFirstMineEnergy = linkFromFirstMine.store[RESOURCE_ENERGY];
        let linkFromSecondMineEnergy = linkFromSecondMine.store[RESOURCE_ENERGY];
        let linkToStorageEnergy = linkToStorageW1N6.store[RESOURCE_ENERGY];
        let linkToUpgraderEnergy = linkToUpgraderW1N6.store[RESOURCE_ENERGY];

        let linkFromFirstMineEnergyW2N6 = linkFromFirstMineW2N6.store[RESOURCE_ENERGY];
        let linkFromSecondMineEnergyW2N6 = linkFromSecondMineW2N6.store[RESOURCE_ENERGY];
        let linkToStorageEnergyW2N6 = linkToStorageW2N6.store[RESOURCE_ENERGY];

        let linkFromFirstMineEnergyW1N7 = linkFromFirstMineW1N7.store[RESOURCE_ENERGY];
        let linkFromSecondMineEnergyW1N7 = linkFromSecondMineW1N7.store[RESOURCE_ENERGY];
        let linkToStorageEnergyW1N7 = linkToStorageW1N7.store[RESOURCE_ENERGY];

        let linkFromFirstMineEnergyW1N7_2 = linkFromFirstMineW1N7_2.store[RESOURCE_ENERGY];

        switch (true) {

            case linkToStorageEnergyW1N7 === 0 && linkFromFirstMineEnergyW1N7_2 === 800:
                linkFromFirstMineW1N7_2.transferEnergy(linkToStorageW1N7);
                break;

            case linkToUpgraderEnergy === 0 && linkFromFirstMineEnergy === 800:
                linkFromFirstMine.transferEnergy(linkToUpgraderW1N6);
                break;

            case linkToUpgraderEnergy === 0 && linkFromSecondMineEnergy === 800:
                linkFromSecondMine.transferEnergy(linkToUpgraderW1N6);
                break;

            case linkToStorageEnergy === 0 && linkFromFirstMineEnergy === 800:
                linkFromFirstMine.transferEnergy(linkToStorageW1N6);
                break;

            case linkToStorageEnergy === 0 && linkFromSecondMineEnergy === 800:
                linkFromSecondMine.transferEnergy(linkToStorageW1N6);
                break;


            case linkToStorageEnergyW2N6 === 0 && linkFromFirstMineEnergyW2N6 === 800:
                linkFromFirstMineW2N6.transferEnergy(linkToStorageW2N6);
                break;

            case linkToStorageEnergyW2N6 === 0 && linkFromSecondMineEnergyW2N6 === 800:
                linkFromSecondMineW2N6.transferEnergy(linkToStorageW2N6);
                break;

            case linkToStorageEnergyW1N7 === 0 && linkFromFirstMineEnergyW1N7 === 800:
                linkFromFirstMineW1N7.transferEnergy(linkToStorageW1N7);
                break;

            case linkToStorageEnergyW1N7 === 0 && linkFromSecondMineEnergyW1N7 === 800:
                linkFromSecondMineW1N7.transferEnergy(linkToStorageW1N7);
                break;


            default:
                break;
        }



    }
}