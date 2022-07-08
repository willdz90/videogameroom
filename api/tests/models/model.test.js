const { Videogame, Genero, conn } = require('../../src/db.js');

it('Type of Videogame model should be function', () => {
  expect(typeof Videogame).toBe('function');
})

it('shloud throw an error if one field of the Videogame is null', () => {
  return Videogame.create({})
          .then(res => {
            expect(res.dataValues.nombre).not.toEqual(null);
            expect(res.dataValues.descripcion).not.toEqual(null)
            expect(res.dataValues.plataformas).not.toEqual([])
          })
})

it('Type of Genero model should be function', () => {
  expect(typeof Genero).toBe('function');
})

it('Should throw an error if there is no name of Genre', () => {
  return Genero.create({})
          .then(res => {
            expect(res.dataValues.nombre).not.toEqual(null)
          })
})