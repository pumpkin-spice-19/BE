exports.up = function(knex, Promise) {
  return knex.schema.createTable("project", tbl => {
    tbl.increments()
    tbl.string("name").notNullable()
    tbl.string("color").notNullable()
    tbl.boolean("fav").defaultTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("project")
}
