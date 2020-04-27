require('spawnCreep')();
var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleFreighter = require('role.freighter');
var roleBridge = require('role.bridge');
var roleWallRepairer = require('role.wallRepairer');
var roleClaimer = require('role.claimer');

module.exports.loop = function () {

// ---------------------------------------------------------------------------------------------------------------------
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    } // clearing the memory

// ---------------------------------------------------------------------------------------------------------------------
    for (let name in Game.creeps) {

        var creep = Game.creeps[name];

        switch (creep.memory.role) {

            case 'miner' :
                roleMiner.run(creep);
                break;

            case 'upgrader' :
                roleUpgrader.run(creep);
                break;

            case 'builder' :
                roleBuilder.run(creep);
                break;

            case 'repairer' :
                roleRepairer.run(creep);
                break;

            case 'freighter' :
                roleFreighter.run(creep);
                break;

            case 'bridge':
                roleBridge.run(creep);
                break;

            case "wallRepairer":
                roleWallRepairer.run(creep);
                break;

            case "claimer":
                roleClaimer.run(creep);
                break;

            case 'undefined' :
                console.log("Returned undefined");
                break;

            default:
                console.log("Fatal Error in creep roles!")
                break;
        }
    } // run modules by creep roles

// ---------------------------------------------------------------------------------------------------------------------
// Towers Module :

    const towers = Game.rooms.W1N6.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            tower.attack(target);
        }
    }

    const towers1 = Game.rooms.W2N6.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    });
    for (let tower of towers1) {
        var target1 = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target1 !== undefined) {
            tower.attack(target1);
        }
    }

// ---------------------------------------------------------------------------------------------------------------------
// Minimum needed creeps for colony
    const miners = 2;
    const upgraders = 1;
    const builders = 3;
    const repairers = 1;
    const freighters = 1;
    const bridges = 1;
    const wallRepairers = 1;
    const claimers = 0;

// current amount owned by colony in W1N6
    const W1N6_Miners = fGetAmountOfCreeps('miner', 'W1N6')
    const W1N6_Upgraders = fGetAmountOfCreeps('upgrader', 'W1N6')
    const W1N6_Builders = fGetAmountOfCreeps('builder', 'W1N6')
    const W1N6_Repairers = fGetAmountOfCreeps('repairer', 'W1N6')
    const W1N6_Freighters = fGetAmountOfCreeps('freighter', 'W1N6')
    const W1N6_Bridges = fGetAmountOfCreeps('bridge', 'W1N6')
    const W1N6_WallRepairers = fGetAmountOfCreeps('wallRepairer', 'W1N6')
    const W1N6_Claimers = fGetAmountOfCreeps('claimer', 'W1N6')

// current amount owned by colony in W2N6
    const W2N6_Miners = fGetAmountOfCreeps('miner', 'W2N6')
    const W2N6_Upgraders = fGetAmountOfCreeps('upgrader', 'W2N6')
    const W2N6_Builders = fGetAmountOfCreeps('builder', 'W2N6')
    const W2N6_Repairers = fGetAmountOfCreeps('repairer', 'W2N6')
    const W2N6_Freighters = fGetAmountOfCreeps('freighter', 'W2N6')
    const W2N6_Bridges = fGetAmountOfCreeps('bridge', 'W2N6')
    const W2N6_WallRepairers = fGetAmountOfCreeps('wallRepairer', 'W2N6')
    const W2N6_Claimers = fGetAmountOfCreeps('claimer', 'W2N6')


// Spawner core module

    let spawnStatus = 0;

// Spawning creeps for W1N6 colony
    switch (true) {

        case W1N6_Miners < miners:
            spawnStatus = Game.spawns.Spawn1.spawnMyCreep('miner', 'W1N6')
            Memory.statistics.miners += 1;
            break;

        case W1N6_Upgraders < upgraders:
            Game.spawns.Spawn1.spawnMyCreep('upgrader', 'W1N6')
            Memory.statistics.upgraders += 1;
            break;

        case W1N6_Builders < builders:
            Game.spawns.Spawn1.spawnMyCreep('builder', 'W1N6')
            Memory.statistics.builders += 1;
            break;

        case W1N6_Repairers < repairers:
            Game.spawns.Spawn1.spawnMyCreep('repairer', 'W1N6')
            Memory.statistics.repairers += 1;
            break;

        case W1N6_Freighters < freighters:
            Game.spawns.Spawn1.spawnMyCreep('freighter', 'W1N6')
            Memory.statistics.freighter += 1;
            break;

        case W1N6_Bridges < bridges:
            Game.spawns.Spawn1.spawnMyCreep('bridge', 'W1N6')
            Memory.statistics.bridges += 1;
            break;

        case W1N6_WallRepairers < wallRepairers:
            Game.spawns.Spawn1.spawnMyCreep('wallRepairer', 'W1N6')
            Memory.statistics.wallRepairers += 1;
            break;

        case W1N6_Claimers < claimers:
            Game.spawns.Spawn1.spawnMyCreep('claimer', 'W1N6')
            Memory.statistics.claimers += 1;
            break;

        default:
            break;


    }

// Spawning creeps for W2N6 colony

    switch (true) {

        case W2N6_Miners < miners:
            spawnStatus = Game.spawns.Spawn1.spawnMyCreep('miner', 'W2N6')
            Memory.statistics.miners += 1;
            break;

        case W2N6_Freighters < freighters:
            Game.spawns.Spawn1.spawnMyCreep('freighter', 'W2N6')
            Memory.statistics.freighter += 1;
            break;

        case W2N6_Bridges < 2:
            Game.spawns.Spawn1.spawnMyCreep('bridge', 'W2N6')
            Memory.statistics.bridges += 1;
            break;

        case W2N6_Upgraders < 5:
            Game.spawns.Spawn2.spawnMyCreep('upgrader', 'W2N6')
            Memory.statistics.upgraders += 1;
            break;

        case W2N6_Repairers < 1:
            Game.spawns.Spawn2.spawnMyCreep('repairer', 'W2N6')
            Memory.statistics.repairers += 1;
            break;

        default:
            break;


    }





// ---------------------------------------------------------------------------------------------------------------------
// Colony links logic

    const linkFromFirstMine = Game.rooms['W1N6'].lookForAt('structure', 39,40 )[0];
    const linkFromSecondMine = Game.rooms['W1N6'].lookForAt('structure', 44,28 )[0];
    const linkToStorage = Game.rooms['W1N6'].lookForAt('structure', 21, 17)[0];
    const linkToUpgrader = Game.rooms['W1N6'].lookForAt('structure', 17, 9)[0];

    let linkFromFirstMineEnergy = linkFromFirstMine.store[RESOURCE_ENERGY];
    let linkFromSecondMineEnergy = linkFromSecondMine.store[RESOURCE_ENERGY];
    let linkToStorageEnergy = linkToStorage.store[RESOURCE_ENERGY];
    let linkToUpgraderEnergy = linkToUpgrader.store[RESOURCE_ENERGY];

    switch (true) {

        case linkToUpgraderEnergy === 0 && linkFromFirstMineEnergy === 800:
            linkFromFirstMine.transferEnergy(linkToUpgrader);
            break;

        case linkToUpgraderEnergy === 0 && linkFromSecondMineEnergy === 800:
            linkFromSecondMine.transferEnergy(linkToUpgrader);
            break;

        case linkToStorageEnergy === 0 && linkFromFirstMineEnergy === 800:
            linkFromFirstMine.transferEnergy(linkToStorage);
            break;

        case linkToStorageEnergy === 0 && linkFromSecondMineEnergy === 800:
            linkFromSecondMine.transferEnergy(linkToStorage);
            break;


        default:
            break;
    }



// ---------------------------------------------------------------------------------------------------------------------
// Functions for whole module


    function fGetAmountOfCreeps(fRole, fHome) {
        return _.sum(Game.creeps, (c) => c.memory.role === fRole && c.memory.home === fHome );
    }

// ---------------------------------------------------------------------------------------------------------------------
// Statistics + timers + chat messages

    Memory.statistics.time += 1;
    console.log('--------------------------------[ ' + Memory.statistics.time + ' ]-----------------------------------')
    console.log('M: ' + W1N6_Miners + ' U: ' + W1N6_Upgraders + ' R: ' + W1N6_Repairers)
        // TODO Make new console log

// ---------------------------------------------------------------------------------------------------------------------

};
