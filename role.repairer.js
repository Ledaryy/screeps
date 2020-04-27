module.exports = {

    run: function (creep) {

        var creepCarryStorage = [];


        if (creep.carry.energy === creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else if (creep.carry.energy === 0) {
            creepCarryStorage = 'empty';
        } else if (creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity) {
            creepCarryStorage = 'not full'
        }

        var creepHome = creep.memory.home

        var container = fParsingModule(STRUCTURE_CONTAINER, RESOURCE_ENERGY, "more", 10);
        var storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000000);
       var everything = creep.pos.findClosestByPath(FIND_STRUCTURES, {
           filter: (f) => f.structureType !== STRUCTURE_WALL && f.structureType !== STRUCTURE_RAMPART && f.hits < f.hitsMax
       })


        if (creepHome === 'W1N6') {

            switch (true) {
                case creepCarryStorage === "empty":
                    fWithdrawEnergy(storage);
                    break;
                case (creepCarryStorage === "full" || creepCarryStorage === "not full"):
                    fRepair(everything);
                    break;
                default:
                    console.log("Errror in Repairer")
                    break;
            }
        }

        if (creepHome === 'W2N6'){
            switch (true) {
                case creepCarryStorage === "empty":
                    fWithdrawEnergy(container);
                    break;
                case (creepCarryStorage === "full" || creepCarryStorage === "not full"):
                    fRepair(everything);
                    break;
                default:
                    console.log("Errror in Repairer")
                    break;
            }
        }



        function fRepair(fStructure) {
            var repairTarget = creep.repair(fStructure);
            switch (repairTarget) {
                case 0:

                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fStructure);
                    break;
                default:

                    break;

            }
        }


        function fWithdrawEnergy(fStorage) {
            var withdrawing = creep.withdraw(fStorage, RESOURCE_ENERGY);
            switch (withdrawing) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fStorage);
                    break;
                default:
                    console.log("Error in fWithdrawEnergy in freighter module!")
                    break;
            }
        }


        function fParsingModule(structureType, energyType, math, neededValue ) { // math can be "more" "less" "equal"
            var foundedStructures = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == structureType
            });
            switch (math) {
                case "more":
                    if (foundedStructures.length > 0) {
                        for (let structure of foundedStructures ){
                            var energyOfStructure = structure.store[energyType];
                            if (energyOfStructure > neededValue) {
                                return structure
                            } // We looking fo structure which have > than neededValue
                        } // import wants a array of structures
                    }
                    else {
                        return "no structures found"
                    }
                    return 0;
                    break;
                case "less":
                    if (foundedStructures.length > 0) {
                        for (let structure of foundedStructures ){
                            var energyOfStructure = structure.store[energyType];
                            if (energyOfStructure < neededValue) {
                                return structure
                            } // We looking fo structure which have > than neededValue
                        } // import wants a array of structures
                    }
                    else {
                        return "no structures found"
                    }
                    return 0;
                    break;
                case "equal":
                    if (foundedStructures.length > 0) {
                        for (let structure of foundedStructures ){
                            var energyOfStructure = structure.store[energyType];
                            if (energyOfStructure === neededValue) {
                                return structure
                            } // We looking fo structure which have > than neededValue
                        } // import wants a array of structures
                    }
                    else {
                        return "no structures found"
                    }
                    return 0;
                    break;
                default:
                    console.log("Wrong math type!!!");
                    break;
            }
        }












    }
};