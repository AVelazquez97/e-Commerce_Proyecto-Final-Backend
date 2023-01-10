const setCartSchema = (table) => {
  table.increments('id');
  table.integer('clientId').unique().unsigned().notNullable();
  table.timestamp('timestamp');
  return table;
};

export default setCartSchema;
