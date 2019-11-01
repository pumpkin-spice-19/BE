exports.up = function(knex, Promise) {
  return knex.schema.createTable("task", tbl => {
    tbl.increments()
    tbl.string("task").notNullable()
    tbl.string("projectName").notNullable()
    tbl
      .integer("projectId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("project")
      .onDelete("restrict")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("task")
}
