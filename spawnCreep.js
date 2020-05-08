


module.exports = function() {

// ---------------------------------------------------------------------------------------------------------------------
// Global parts [WORK, CARRY, MOVE, CLAIM, TOUGH]
    const partsForMiner = [6, 4, 3];
    const partsForUpgrader = [6, 4, 2];
    const partsForRepairer = [3, 4, 3];
    const partsForBuilder = [3, 6, 5];
    const partsForFreighter = [0, 16, 8];
    const partsForBridge = [0, 8, 1];
    const partsForWallRepairer = [3, 4, 3];
    const partsForClaimer = [1, 1, 6];
    const partForTank = [0, 0, 10, 0, 40]

    const partsManager = {
        partsForMiner: [6, 4, 3],
        partsForUpgrader: [6, 4, 2],
        partsForRepairer: [3, 4, 3],
        partsForBuilder: [3, 6, 5],
        partsForFreighter: [0, 16, 8],
        partsForBridge: [0, 8, 1],
        partsForWallRepairer: [3, 4, 3],
        partsForClaimer: [1, 1, 6],
    }


// ---------------------------------------------------------------------------------------------------------------------
// Mining Module!
    let bodyParts = [];

    StructureSpawn.prototype.spawnMyCreep=
        function (roleName, creepRoom, target) {


            if (creepRoom === 'W1N6'){
                switch (roleName) {
                    case 'miner':
                        bodyParts = fCreateBody(partsForMiner[0], partsForMiner[1], partsForMiner[2])
                        return this.createCreep(bodyParts, "Miner - " + Memory.statistics.miners + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            position: fGetMiningPosition('W1N6'),
                            carryStorage: 'empty',
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
                            carryStorage: 'empty',
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
                        bodyParts = fCreateBody(0, 0, 5, 1)

                        return this.createCreep(bodyParts, "Claimer - " + Memory.statistics.claimers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'train':
                        bodyParts = fCreateBody(partsForFreighter[0], partsForFreighter[1], partsForFreighter[2])
                        return this.createCreep(bodyParts, "Train - " + Memory.statistics.trains + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            cargo: 'empty',
                            target: target,

                        });

                    case 'panzer':
                        bodyParts = fCreateBody(0, 0, 10, 0, 0, 25)

                        return this.createCreep(bodyParts, "Panzer - " + Memory.statistics.panzers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            targetRoom: "W1N7",
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
                            position: fGetMiningPosition('W2N6'),
                            carryStorage: 'empty',
                        });

                    case 'upgrader':
                        bodyParts = fCreateBody(3, 3, 3)

                        return this.createCreep(bodyParts, "Upgrader - " + Memory.statistics.upgraders + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                        });

                    case 'builder':
                        bodyParts = fCreateBody(partsForBuilder[0], partsForBuilder[1], partsForBuilder[2])

                        return this.createCreep(bodyParts, "Builder - " + Memory.statistics.builders + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            carryStorage: 'empty',
                        });

                    case 'repairer':
                        bodyParts = fCreateBody(3, 3, 3)

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
                        bodyParts = fCreateBody(0, 0, 5, 2, 0, 0)

                        return this.createCreep(bodyParts, "Claimer - " + Memory.statistics.claimers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            roomTarget: 'W2N7'
                        });


                    default:
                        console.log('Error in main spawn module');
                        break;

                }
            }

            if (creepRoom === 'W1N7'){
                switch (roleName) {
                    case 'miner':
                        bodyParts = fCreateBody(partsForMiner[0], partsForMiner[1], partsForMiner[2])
                        return this.createCreep(bodyParts, "Miner - " + Memory.statistics.miners + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            position: fGetMiningPosition('W1N7'),
                            carryStorage: 'empty',
                        });

                    case 'upgrader':
                        bodyParts = fCreateBody(3, 3, 3)

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
                        bodyParts = fCreateBody(3, 3, 3)

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
                        bodyParts = fCreateBody(partsForFreighter[0], partsForFreighter[1], partsForFreighter[2])

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
                        bodyParts = fCreateBody(0, 0, 5, 2, 0, 0)

                        return this.createCreep(bodyParts, "Claimer - " + Memory.statistics.claimers + " - " + creepRoom, {
                            role: roleName,
                            home: creepRoom,
                            roomTarget: 'W2N7'
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

    function fCreateBody(fWork, fCarry, fMove, fClaim, fTough, fAttack) {

        let fBodyParts = [];

        for (let i = 0; i < fWork; i++) {
            fBodyParts.push(WORK);
        }
        for (let i = 0; i < fClaim; i++) {
            fBodyParts.push(CLAIM);
        }
        for (let i = 0; i < fCarry; i++) {
            fBodyParts.push(CARRY);
        }
        for (let i = 0; i < fMove; i++) {
            fBodyParts.push(MOVE);
        }
        for (let i = 0; i < fTough; i++) {
            fBodyParts.push(TOUGH);
        }
        for (let i = 0; i < fAttack; i++) {
            fBodyParts.push(ATTACK);
        }


        return fBodyParts;


    }

    function fGetMiningPosition(roomName) {


        let W1N6_FirstPos = fGetAmountOfCreeps('miner', 'W1N6', 'first');
        let W1N6_SecondPos = fGetAmountOfCreeps('miner', 'W1N6', 'second');

        let W2N6_FirstPos = fGetAmountOfCreeps('miner', 'W2N6', 'first');
        let W2N6_SecondPos = fGetAmountOfCreeps('miner', 'W2N6', 'second');

        let W1N7_FirstPos = fGetAmountOfCreeps('miner', 'W1N7', 'first');
        let W1N7_SecondPos = fGetAmountOfCreeps('miner', 'W1N7', 'second');

        switch (true) {
            case roomName === 'W1N6' && W1N6_FirstPos === 1:
                return 'second'
            case roomName === 'W1N6' && W1N6_SecondPos === 1:
                return 'first'
            case roomName === 'W2N6' && W2N6_FirstPos === 1:
                return 'second'
            case roomName === 'W2N6' && W2N6_SecondPos === 1:
                return 'first'
            case roomName === 'W1N7' && W1N7_FirstPos === 1:
                return 'second'
            case roomName === 'W1N7' && W1N7_SecondPos === 1:
                return 'first'
            default:
                return 'first'
        }


    }
// ---------------------------------------------------------------------------------------------------------------------
};