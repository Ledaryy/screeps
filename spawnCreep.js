


module.exports = function() {

// ---------------------------------------------------------------------------------------------------------------------
// Global parts [WORK, CARRY, MOVE]
    const partsForMiner = [6, 4, 2];
    const partsForUpgrader = [6, 4, 2];
    const partsForRepairer = [3, 4, 3];
    const partsForBuilder = [3, 4, 3];
    const partsForFreighter = [0, 16, 8];
    const partsForBridge = [0, 8, 1];
    const partsForWallRepairer = [3, 4, 3];
    const partsForClaimer = [1, 1, 6];

// ---------------------------------------------------------------------------------------------------------------------
// Mining Module!
    let bodyParts = [];

    StructureSpawn.prototype.spawnMyCreep=
        function (roleName, creepRoom) {


            if (creepRoom === 'W1N6'){
                switch (roleName) {
                    case 'miner':
                        bodyParts = fCreateBody(partsForMiner[0], partsForMiner[1], partsForMiner[2])
                        return this.createCreep(bodyParts, "Miner - " + Memory.statistics.miners + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            position: fGetMiningPosition('W1N6'),
                        });

                    case 'upgrader':
                        bodyParts = fCreateBody(partsForUpgrader[0], partsForUpgrader[1], partsForUpgrader[2])

                        return this.createCreep(bodyParts, "Upgrader - " + Memory.statistics.upgraders + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'builder':
                        bodyParts = fCreateBody(partsForBuilder[0], partsForBuilder[1], partsForBuilder[2])

                        return this.createCreep(bodyParts, "Builder - " + Memory.statistics.builders + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'repairer':
                        bodyParts = fCreateBody(partsForRepairer[0], partsForRepairer[1], partsForRepairer[2])

                        return this.createCreep(bodyParts, "Repairer - " + Memory.statistics.repairers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'freighter':
                        bodyParts = fCreateBody(partsForFreighter[0], partsForFreighter[1], partsForFreighter[2])

                        return this.createCreep(bodyParts, "Freighter - " + Memory.statistics.freighter + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'bridge':
                        bodyParts = fCreateBody(partsForBridge[0], partsForBridge[1], partsForBridge[2])

                        return this.createCreep(bodyParts, "Bridges - " + Memory.statistics.bridges + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'wallRepairer':
                        bodyParts = fCreateBody(partsForWallRepairer[0], partsForWallRepairer[1], partsForWallRepairer[2])

                        return this.createCreep(bodyParts, "WallRepairer - " + Memory.statistics.wallRepairers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'claimer':
                        bodyParts = fCreateBody(partsForClaimer[0], partsForClaimer[1], partsForClaimer[2])

                        return this.createCreep(bodyParts, "Claimer - " + Memory.statistics.claimers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    default:
                        console.log('Error in main spawn module');
                        break;

                }
            }

            if (creepRoom === 'W2N6'){
                switch (roleName) {
                    case 'miner':
                        bodyParts = fCreateBody(partsForMiner[0], partsForMiner[1], partsForMiner[2])
                        return this.createCreep(bodyParts, "Miner - " + Memory.statistics.miners + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            position: minerCreepPosition,
                        });

                    case 'upgrader':
                        bodyParts = fCreateBody(partsForUpgrader[0], partsForUpgrader[1], partsForUpgrader[2])

                        return this.createCreep(bodyParts, "Upgrader - " + Memory.statistics.upgraders + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'builder':
                        bodyParts = fCreateBody(partsForBuilder[0], partsForBuilder[1], partsForBuilder[2])

                        return this.createCreep(bodyParts, "Builder - " + Memory.statistics.builders + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'repairer':
                        bodyParts = fCreateBody(partsForRepairer[0], partsForRepairer[1], partsForRepairer[2])

                        return this.createCreep(bodyParts, "Repairer - " + Memory.statistics.repairers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'freighter':
                        bodyParts = fCreateBody(partsForFreighter[0], partsForFreighter[1], partsForFreighter[2])

                        return this.createCreep(bodyParts, "Freighter - " + Memory.statistics.freighter + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'bridge':
                        bodyParts = fCreateBody(partsForBridge[0], partsForBridge[1], partsForBridge[2])

                        return this.createCreep(bodyParts, "Bridges - " + Memory.statistics.bridges + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'wallRepairer':
                        bodyParts = fCreateBody(partsForWallRepairer[0], partsForWallRepairer[1], partsForWallRepairer[2])

                        return this.createCreep(bodyParts, "WallRepairer - " + Memory.statistics.wallRepairers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'claimer':
                        bodyParts = fCreateBody(partsForClaimer[0], partsForClaimer[1], partsForClaimer[2])

                        return this.createCreep(bodyParts, "Claimer - " + Memory.statistics.claimers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    default:
                        console.log('Error in main spawn module');
                        break;

                }
            }




        };





// ---------------------------------------------------------------------------------------------------------------------
// Functions for whole module

    function fGetAmountOfCreeps(fRole, fHome, fPosition) {

        return _.sum(Game.creeps, (c) => c.memory.role === fRole && c.memory.home === fHome && c.memory.position === fPosition);

    }

    function fCreateBody(fWork, fCarry, fMove) {

        let fBodyParts = [];

        for (let i = 0; i < fWork; i++) {
            fBodyParts.push(WORK);
        }
        for (let i = 0; i < fCarry; i++) {
            fBodyParts.push(CARRY);
        }
        for (let i = 0; i < fMove; i++) {
            fBodyParts.push(MOVE);
        }


        return fBodyParts;


    }

    function fGetMiningPosition(roomName) {


        let W1N6_First = fGetAmountOfCreeps('miner', 'W1N6', 'first');
        let W1N6_Second = fGetAmountOfCreeps('miner', 'W1N6', 'second');

        let W2N6_First = fGetAmountOfCreeps('miner', 'W2N6', 'first');
        let W2N6_Second = fGetAmountOfCreeps('miner', 'W2N6', 'second');

    if (roomName === 'W1N6') {

        switch (true) {
            case W1N6_First === 1 && W1N6_Second === 0:
                return 'second'

            case W1N6_First === 0 && W1N6_Second === 1:
                return 'first'

            case W1N6_First === 0 && W1N6_Second === 0:
                return 'first';

            default:
                break;

        } // Choosing creep for W1N6
    }

        /*
                switch (true) {
                    case W2N6_First === 1 && W2N6_Second === 0:
                        minerCreepPosition = 'second';
                        break;

                    case W2N6_First === 0 && W2N6_Second === 1:
                        minerCreepPosition = 'first';
                        break;

                    case W2N6_First === 0 && W2N6_Second === 0:
                        minerCreepPosition = 'first';
                        break;

                    default:
                        break;

                } // Choosing creep for W2N6
            */

    }

// ---------------------------------------------------------------------------------------------------------------------
};