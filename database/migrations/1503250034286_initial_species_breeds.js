'use strict'
const Specie = use('App/Models/Specie')
const Schema = use('Schema')
const Helpers = use('Helpers')

class SpecieInitial extends Schema {

  async up () {
    const cachorro = await Specie.create({id: 1, name:'Cachorro', avatar : 'cachorro' });

    await cachorro.breeds().createMany([
      {name: 'SRD'},
      {name: 'Bulldog'},
      {name: 'Poodle'},
      {name: 'Labrador Retriever'},
      {name: 'Beagle'},
      {name: 'Golden Retriever'},
      {name: 'Chihuahua'},
      {name: 'Dobermann'}
    ]);

    const gato = await Specie.create({id: 2, name:'Gato', avatar : 'gato' });
    await gato.breeds().createMany([
      {name: 'SRD'},
      {name: 'Persa'},
      {name: 'Gato de pelo curto inglês'},
      {name: 'Siamês'},
      {name: 'Gato-de-bengala'},
      {name: 'Siberiano'},
      {name: 'Tonquinês'},
      {name: 'Oriental Longhair'}
    ]);

    const ave = await Specie.create({id: 3, name:'Aves', avatar : 'aves' });
    await ave.breeds().createMany([
      {name: 'SRD'},
      {name: 'Arara'},
      {name: 'Calopsita'},
      {name: 'Canário'},
      {name: 'Coleiro'},
      {name: 'Curió'},
      {name: 'Papagaio'},
      {name: 'Pintassilgo'},
      {name: 'Trinca-Ferro'},
    ]);

    const peixe = await Specie.create({id: 4, name:'Peixe', avatar : 'peixes' });
    await peixe.breeds().createMany([
      {name: 'SRD'},
      {name: 'Koi'},
      {name: 'Kinguio-oranda'},
      {name: 'Cauda-de-cometa'},
      {name: 'Telescópio Preto'},
      {name: 'Peixe-dourado comum'},
      {name: 'Cabeça-de-leão'},
      {name: 'Cauda-de-véu'}
    ]);
  }

  async down () {
    await Specie.query().where('name','<>','').delete()
  }
}
module.exports = SpecieInitial
