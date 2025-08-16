const bcrypt = require('bcryptjs');

const plainPassword = "Gokul@1234";

async function testHash() {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("✅ Newly Hashed Password:", hashedPassword);
}

testHash();
