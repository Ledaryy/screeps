module.exports = {

    run: function() {


        const TowersW1N6 = fFindTowers('W1N6')
        const TowersW1N7 = fFindTowers('W1N7')
        const TowersW2N6 = fFindTowers('W2N6')


        for (let tower of TowersW1N6) {
            let fireTarget = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let repairTarget = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (f) => f.structureType !== STRUCTURE_WALL && f.structureType !== STRUCTURE_RAMPART && f.hits < f.hitsMax
            })
            let healTarget = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (f) => f.hits < f.hitsMax
            })


            if (fireTarget !== undefined) {
                tower.attack(fireTarget)
            }
            if (repairTarget !== undefined) {
                tower.repair(repairTarget)
            }
            if (healTarget !== undefined) {
                tower.heal(healTarget)
            }

        }
        for (let tower of TowersW1N7) {
            let fireTarget = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let repairTarget = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (f) => f.structureType !== STRUCTURE_WALL && f.structureType !== STRUCTURE_RAMPART && f.hits < f.hitsMax
            })
            let healTarget = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (f) => f.hits < f.hitsMax
            })


            if (fireTarget !== undefined) {
                tower.attack(fireTarget)
            }
            if (repairTarget !== undefined) {
                tower.repair(repairTarget)
            }
            if (healTarget !== undefined) {
                tower.heal(healTarget)
            }

        }
        for (let tower of TowersW2N6) {
            let fireTarget = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let repairTarget = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (f) => f.structureType !== STRUCTURE_WALL && f.structureType !== STRUCTURE_RAMPART && f.hits < f.hitsMax
            })
            let healTarget = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (f) => f.hits < f.hitsMax
            })


            if (fireTarget !== undefined) {
                tower.attack(fireTarget)
            }
            if (repairTarget !== undefined) {
                tower.repair(repairTarget)
            }
            if (healTarget !== undefined) {
                tower.heal(healTarget)
            }

        }

        function fFindTowers(fRoom) {
            return Game.rooms[fRoom].find(FIND_STRUCTURES, {
                filter: (f) => f.structureType === STRUCTURE_TOWER
            })

        }
    }
}