require('spawnCreep')();
var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleFreighter = require('role.freighter');
var roleBridge = require('role.bridge');
var roleWallRepairer = require('role.wallRepairer');
var roleClaimer = require('role.claimer');
var roleTrain = require('role.train');
var rolePanzer = require('role.panzer')

module.exports.loop = function () {
    // TODO rework functions to work with true/false, not with 0
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

            case "train":
                roleTrain.run(creep);
                break;

            case "panzer":
                rolePanzer.run(creep);
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
    var everything = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (f) => f.structureType !== STRUCTURE_WALL && f.structureType !== STRUCTURE_RAMPART && f.hits < f.hitsMax
    })
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            tower.attack(target);
        }
        if (everything !== undefined){
            tower.repair(everything);
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
        if (everything !== undefined){
            tower.repair(everything);
        }
    }


    var towerinka = fFindTowers('Spawn1');
    console.log(towerinka,'tow')
    function fFindTowers(fRoom) {
        let towers = Game.spawns[fRoom].room.find(FIND_STRUCTURES, {
            filter: (f) => f.structureType === STRUCTURE_TOWER
        });


    }

// ---------------------------------------------------------------------------------------------------------------------
// Minimum needed creeps for colony
    const miners = 2;
    const upgraders = 1;
    const builders = 0;
    const repairers = 0;
    const freighters = 1;
    const bridges = 1;
    const wallRepairers = 1;
    const claimers = 0;
    const trains = 0;
    const panzers = 0;

// current amount owned by colony in W1N6
    const W1N6_Miners = fGetAmountOfCreeps('miner', 'W1N6')
    const W1N6_Upgraders = fGetAmountOfCreeps('upgrader', 'W1N6')
    const W1N6_Builders = fGetAmountOfCreeps('builder', 'W1N6')
    const W1N6_Repairers = fGetAmountOfCreeps('repairer', 'W1N6')
    const W1N6_Freighters = fGetAmountOfCreeps('freighter', 'W1N6')
    const W1N6_Bridges = fGetAmountOfCreeps('bridge', 'W1N6')
    const W1N6_WallRepairers = fGetAmountOfCreeps('wallRepairer', 'W1N6')
    const W1N6_Claimers = fGetAmountOfCreeps('claimer', 'W1N6')
    const W1N6_Trains = fGetAmountOfCreeps('train', 'W1N6')
    const W1N6_Panzers = fGetAmountOfCreeps('panzer', 'W1N6')

// current amount owned by colony in W2N6
    const W2N6_Miners = fGetAmountOfCreeps('miner', 'W2N6')
    const W2N6_Upgraders = fGetAmountOfCreeps('upgrader', 'W2N6')
    const W2N6_Builders = fGetAmountOfCreeps('builder', 'W2N6')
    const W2N6_Repairers = fGetAmountOfCreeps('repairer', 'W2N6')
    const W2N6_Freighters = fGetAmountOfCreeps('freighter', 'W2N6')
    const W2N6_Bridges = fGetAmountOfCreeps('bridge', 'W2N6')
    const W2N6_WallRepairers = fGetAmountOfCreeps('wallRepairer', 'W2N6')
    const W2N6_Claimers = fGetAmountOfCreeps('claimer', 'W2N6')

    // current amount owned by colony in W1N7
    const W1N7_Miners = fGetAmountOfCreeps('miner', 'W1N7')
    const W1N7_Upgraders = fGetAmountOfCreeps('upgrader', 'W1N7')
    const W1N7_Builders = fGetAmountOfCreeps('builder', 'W1N7')
    const W1N7_Repairers = fGetAmountOfCreeps('repairer', 'W1N7')
    const W1N7_Freighters = fGetAmountOfCreeps('freighter', 'W1N7')
    const W1N7_Bridges = fGetAmountOfCreeps('bridge', 'W1N7')
    const W1N7_WallRepairers = fGetAmountOfCreeps('wallRepairer', 'W1N7')
    const W1N7_Claimers = fGetAmountOfCreeps('claimer', 'W1N7')
    const W1N7_Trains = fGetAmountOfCreeps('train', 'W1N7')
    const W1N7_Panzers = fGetAmountOfCreeps('panzer', 'W1N7')


// Spawner core module

    let spawnStatus = 0;

// Spawning creeps for W1N6 colony
    switch (true) {

        case W1N6_Freighters < freighters:
            Game.spawns.Spawn1.spawnMyCreep('freighter', 'W1N6')
            Memory.statistics.freighter += 1;
            break;

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



        case W1N6_Bridges < bridges:
            Game.spawns.Spawn1.spawnMyCreep('bridge', 'W1N6')
            Memory.statistics.bridges += 1;
            break;

        case W1N6_WallRepairers < wallRepairers:
            Game.spawns.Spawn1.spawnMyCreep('wallRepairer', 'W1N6')
            Memory.statistics.wallRepairers += 1;
            break;

        case W1N6_Claimers < 0:
            Game.spawns.Spawn1.spawnMyCreep('claimer', 'W1N6')
            Memory.statistics.claimers += 1;
            break;

        case W1N6_Trains < trains:
            Game.spawns.Spawn1.spawnMyCreep('train', 'W1N6', 'W2N6')
            Memory.statistics.trains += 1;
            break;

        case W1N6_Panzers < panzers:
            Game.spawns.Spawn1.spawnMyCreep('panzer', 'W1N6')
            Memory.statistics.panzers += 1;
            break;

        case W1N7_Upgraders < 0:
            Game.spawns.Spawn1.spawnMyCreep('upgrader', 'W1N7')
            Memory.statistics.upgraders += 1;
            break;
        case W1N7_Builders < 0:
            Game.spawns.Spawn1.spawnMyCreep('builder', 'W1N7')
            Memory.statistics.builders += 1;
            break;

        default:
            break;


    }

// Spawning creeps for W2N6 colony
    switch (true) {

        case W2N6_Freighters < freighters:
            Game.spawns.Spawn2.spawnMyCreep('freighter', 'W2N6')
            Memory.statistics.freighter += 1;
            break;

        case W2N6_Miners < miners:
            spawnStatus = Game.spawns.Spawn2.spawnMyCreep('miner', 'W2N6')
            Memory.statistics.miners += 1;
            break;


        case W2N6_Bridges < bridges:
            Game.spawns.Spawn2.spawnMyCreep('bridge', 'W2N6')
            Memory.statistics.bridges += 1;
            break;


        case W2N6_Upgraders < 5:
            Game.spawns.Spawn2.spawnMyCreep('upgrader', 'W2N6')
            Memory.statistics.upgraders += 1;
            break;

        case W2N6_Builders < builders:
            Game.spawns.Spawn2.spawnMyCreep('builder', 'W2N6')
            Memory.statistics.builders += 1;
            break;

        case W2N6_Repairers < repairers:
            Game.spawns.Spawn2.spawnMyCreep('repairer', 'W2N6')
            Memory.statistics.repairers += 1;
            break;


        case W2N6_WallRepairers < 2:
            Game.spawns.Spawn2.spawnMyCreep('wallRepairer', 'W2N6')
            Memory.statistics.wallRepairers += 1;
            break;

        case W2N6_Claimers < 1:
            Game.spawns.Spawn2.spawnMyCreep('claimer', 'W2N6')
            Memory.statistics.claimers += 1;
            break;

        default:
            break;


    }

// Spawning creeps for W1N7 colony
    switch (true) {

        case W1N7_Freighters < freighters:
            Game.spawns.Spawn1_1.spawnMyCreep('freighter', 'W1N7')
            Memory.statistics.freighter += 1;
            break;

        case W1N7_Miners < miners:
            spawnStatus = Game.spawns.Spawn1_1.spawnMyCreep('miner', 'W1N7')
            Memory.statistics.miners += 1;
            break;


        case W1N7_Bridges < 4:
            Game.spawns.Spawn1_1.spawnMyCreep('bridge', 'W1N7')
            Memory.statistics.bridges += 1;
            break;


        case W1N7_Upgraders < 5:
            Game.spawns.Spawn3.spawnMyCreep('upgrader', 'W1N7')
            Memory.statistics.upgraders += 1;
            break;

        case W1N7_Builders < 1:
            Game.spawns.Spawn3.spawnMyCreep('builder', 'W1N7')
            Memory.statistics.builders += 1;
            break;

        case W1N7_Repairers < repairers:
            Game.spawns.Spawn3.spawnMyCreep('repairer', 'W1N7')
            Memory.statistics.repairers += 1;
            break;


        case W1N7_WallRepairers < 2:
            Game.spawns.Spawn3.spawnMyCreep('wallRepairer', 'W1N7')
            Memory.statistics.wallRepairers += 1;
            break;



        default:
            break;


    }


// ---------------------------------------------------------------------------------------------------------------------
// Colony links logic

    const linkFromFirstMine = Game.rooms['W1N6'].lookForAt('structure', 39,40 )[0];
    const linkFromSecondMine = Game.rooms['W1N6'].lookForAt('structure', 44,28 )[0];
    const linkToStorageW1N6 = Game.rooms['W1N6'].lookForAt('structure', 21, 17)[0];
    const linkToUpgraderW1N6 = Game.rooms['W1N6'].lookForAt('structure', 17, 9)[0];

    const linkFromFirstMineW2N6 = Game.rooms['W2N6'].lookForAt('structure', 4,13 )[0];
    const linkFromSecondMineW2N6 = Game.rooms['W2N6'].lookForAt('structure', 45,28 )[0];
    const linkToStorageW2N6 = Game.rooms['W2N6'].lookForAt('structure', 25, 29)[0];

    let linkFromFirstMineEnergy = linkFromFirstMine.store[RESOURCE_ENERGY];
    let linkFromSecondMineEnergy = linkFromSecondMine.store[RESOURCE_ENERGY];
    let linkToStorageEnergy = linkToStorageW1N6.store[RESOURCE_ENERGY];
    let linkToUpgraderEnergy = linkToUpgraderW1N6.store[RESOURCE_ENERGY];

    let linkFromFirstMineEnergyW2N6 = linkFromFirstMineW2N6.store[RESOURCE_ENERGY];
    let linkFromSecondMineEnergyW2N6 = linkFromSecondMineW2N6.store[RESOURCE_ENERGY];
    let linkToStorageEnergyW2N6 = linkToStorageW2N6.store[RESOURCE_ENERGY];


    switch (true) {

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
    let age = 1;
    const ageStr = age > 5 ? 'old' : 'young';
    console.log(`age is ${ageStr}`);
    Memory.statistics.time += 1;
    console.log('--------------------------------[ ' + Memory.statistics.time + ' ]-----------------------------------')
    console.log('M: ' + W1N6_Miners + ' U: ' + W1N6_Upgraders + ' R: ' + W1N6_Repairers)
    console.log(``)
    // TODO Make new console log

// ---------------------------------------------------------------------------------------------------------------------

};
