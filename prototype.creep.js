Creep.prototype.dataPack =
    function () {
        return {
            spawn: this.findStructure(STRUCTURE_SPAWN, RESOURCE_ENERGY, "less", 300),
            extension:  this.findStructure(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 100),
            extensionLowPower:  this.findStructure(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 50),
            tower:  this.findStructure(STRUCTURE_TOWER, RESOURCE_ENERGY, "less", 600),
            storage:  this.findStructure(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000001),
            droppedResource:  this.pos.findClosestByRange(FIND_DROPPED_RESOURCES),
            terminal: this.findStructure(STRUCTURE_TERMINAL, RESOURCE_ENERGY, "less", 300000),
            linkW1N6: this.linkFinder("W1N6", 21, 17, 1),
            linkW1N7: this.linkFinder('W1N7', 24, 23, 1),
            linkW2N6: this.linkFinder("W2N6", 25, 29, 1)

        }

    }

Creep.prototype.creepDataPack =
    function () {
        return {
            creepHome: this.memory.home,
            creepPosition: this.room.name,
            creepEnergy: this.store.energy,
            creepCapacity: this.store.getFreeCapacity(),
            carryStorage: function (creepEnergy, creepCapacity) {

                if (creepEnergy === creepCapacity){
                    return 'full'
                }
                if (creepEnergy === 0){
                    return 'empty'
                }
            }



        }
    }



Creep.prototype.findStructure =
    function (structureType, energyType, math, neededValue ) { // math can be "more" "less" "equal"
    var foundedStructures = this.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === structureType
    });
    var foundedCorrectStructures = [];
    var bestPath = [];

    switch (math) {
        case "more":
            if (foundedStructures.length > 0) {
                for (let structure of foundedStructures ){
                    let energyOfStructure = structure.store[energyType];
                    if (energyOfStructure > neededValue) {
                        foundedCorrectStructures.push(structure)

                    } // We looking fo structure which have > than neededValue
                } // import wants a array of structures
                bestPath = this.pos.findClosestByPath(foundedCorrectStructures);
                if (bestPath !== null){
                    return bestPath;
                }

            }

            return 'full';

        case "less":
            if (foundedStructures.length > 0) {
                for (let structure of foundedStructures ){
                    let energyOfStructure = structure.store[energyType];
                    if (energyOfStructure < neededValue) {
                        foundedCorrectStructures.push(structure)
                    } // We looking fo structure which have > than neededValue
                } // import wants a array of structures
                bestPath = this.pos.findClosestByPath(foundedCorrectStructures);
                if (bestPath !== null){
                    return bestPath;
                }
            }

            return 'full';

        case "equal":
            if (foundedStructures.length > 0) {
                for (let structure of foundedStructures ){
                    let energyOfStructure = structure.store[energyType];
                    if (energyOfStructure === neededValue) {
                        foundedCorrectStructures.push(structure)

                    } // We looking fo structure which have > than neededValue
                } // import wants a array of structures
                bestPath = this.pos.findClosestByPath(foundedCorrectStructures);
                if (bestPath !== null){
                    return bestPath;
                }
            }

            return 'full';

        default:
            console.log("Wrong math type!!!");
            break;
    }
} // v 1.1

Creep.prototype.moveToExit =
    function (fTarget) {

        let exit = this.room.findExitTo(fTarget);
        let exitPos = this.pos.findClosestByRange(exit);

        this.moveTo(exitPos);

    }

Creep.prototype.pickupResource =
     function (fTarget) {
           let pickUp = this.pickup(fTarget);
          switch (pickUp) {
              case ERR_NOT_IN_RANGE:
                  this.moveTo(fTarget);
                  break;

                default:
                    break;
            }
        }

Creep.prototype.transferTo =
    function (fStructure, fResourceType) {
        let transferring = this.transfer(fStructure, fResourceType);
        switch (transferring) {
            case ERR_NOT_IN_RANGE:
                this.moveTo(fStructure);
                break;

            default:
                break;
        }
    }

Creep.prototype.withdrawFrom =
    function (fStorage, fResourceType) {
        let withdrawing = this.withdraw(fStorage, fResourceType);
        switch (withdrawing) {
            case ERR_NOT_IN_RANGE:
                this.moveTo(fStorage);
                break;

            default:
                break;
        }
    }

Creep.prototype.harvestSource =
    function () {
    var source = this.pos.findClosestByPath(FIND_SOURCES);
    var harvestSource = this.harvest(source);
    switch (harvestSource) {
        case 0:

            break;
        case ERR_NOT_IN_RANGE:
            this.moveByRole();
            break;
        default:
            this.say("🚬");
            break;

    }
}

Creep.prototype.moveByRole =
    function () {
    let room = this.memory.home;
    let position = this.memory.position;

    switch (true) {
        case room === 'W1N6' && position === 'first':
            this.moveTo(44,27); // 44,27
            break;

        case room === 'W1N6' && position === 'second':
            this.moveTo(39,39);
            break;

        case room === 'W2N6' && position === 'first':
            this.moveTo(45,29);
            break;

        case room === 'W2N6' && position === 'second':
            this.moveTo(5,13);
            break;

        case room === 'W1N7' && position === 'first':
            this.moveTo(25,10);
            break;

        case room === 'W1N7' && position === 'second':
            this.moveTo(34,34);
            break;



        default:
            break;
    }


}

Creep.prototype.transferToLink =
    function () {
    var link = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_LINK
    });
    var moveEnergyToLink = this.transfer(link, RESOURCE_ENERGY);
    switch (moveEnergyToLink) {
        case 0:

            break;
        case ERR_NOT_IN_RANGE:
            this.moveTo(link);
            break;
        case ERR_INVALID_TARGET:

            break;
        case ERR_FULL:

            break;
        default:

            console.log("Err in fMoveEnergyToLink in harvest module!");
            break;
    }
}

Creep.prototype.linkFinder =
    function (roomName, xPosition, yPosition, neededValue) {
        var link = Game.rooms[roomName].lookForAt('structure', xPosition, yPosition)[0];
        var energyStoredInLink = link.store[RESOURCE_ENERGY];
        if (energyStoredInLink > neededValue) {
            return link
        } else {
            return "empty"
        }

    }