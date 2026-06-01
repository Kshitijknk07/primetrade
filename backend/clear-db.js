const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'primetrade',
  'primetrade_user',
  'primetrade123',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  }
);

async function clearDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.query('DELETE FROM comments');
    console.log('✅ Cleared comments');

    await sequelize.query('DELETE FROM tasks');
    console.log('✅ Cleared tasks');

    await sequelize.query('DELETE FROM users');
    console.log('✅ Cleared users');

    const users = await sequelize.query('SELECT COUNT(*) as count FROM users', { type: sequelize.QueryTypes.SELECT });
    const tasks = await sequelize.query('SELECT COUNT(*) as count FROM tasks', { type: sequelize.QueryTypes.SELECT });
    const comments = await sequelize.query('SELECT COUNT(*) as count FROM comments', { type: sequelize.QueryTypes.SELECT });

    console.log('\n📊 Database Status:');
    console.log(`Users: ${users[0].count}`);
    console.log(`Tasks: ${tasks[0].count}`);
    console.log(`Comments: ${comments[0].count}`);

    console.log('\n✅ Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearDatabase();
