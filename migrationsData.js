exports.up = (knex, Promise) =>
  knex.schema.createTable('runnertracking', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.boolean('Started');
    table.time('RasberryOneIn');
    table.time('RasberryOneOut');
    table.time('AnteroIn');
    table.time('AnteroOut');
    table.time('StElmoOneIn');
    table.time('StElmoOneOut');
    table.time('CottonwoodIn');
    table.time('CottonwoodOut');
    table.time('StElmoTwoOut');
    table.time('StElmoTwoIn');
    table.time('HancockIn');
    table.time('HancockOut');
    table.time('LostWonderIn');
    table.time('LostWonderOut');
    table.time('PurgatoryIn');
    table.time('PurgatoryOut');
    table.time('MonarchIn');
    table.time('MonarchOut');
    table.time('FoosesIn');
    table.time('FoosesOut');
    table.time('BlanksIn');
    table.time('BlanksOut');
    table.time('RasberryTwoIn');
    table.time('RasberryTwoOut');
    table.time('Finish');
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists('runnertracking');
