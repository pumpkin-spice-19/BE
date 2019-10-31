exports.up = function(knex, Promise) {
  return knex.schema.createTable("todo", tbl => {
    tbl.increments()
    tbl.string("name").notNullable()
    tbl.boolean("fav").defaultTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("todo")
}
