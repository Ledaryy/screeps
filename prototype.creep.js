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
        let withdrawing = this.withdraw(fStorage, RESOURCE_ENERGY);
        switch (withdrawing) {
            case ERR_NOT_IN_RANGE:
                this.moveTo(fStorage);
                break;

            default:
                break;
        }
    }

