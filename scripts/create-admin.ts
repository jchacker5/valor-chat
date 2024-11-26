import { db } from '@/lib/db';
import { hash } from 'bcrypt';

async function createAdminUser() {
  try {
    // First, check if role type exists
    await db`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('admin', 'user');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Add role column if it doesn't exist
    await db`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';
    `;

    // Hash the password
    const hashedPassword = await hash('Defendre21', 10);

    // Create admin user
    await db`
      INSERT INTO users (email, password, role)
      VALUES ('jchacker5@gmail.com', ${hashedPassword}, 'admin')
      ON CONFLICT (email) 
      DO UPDATE SET role = 'admin', password = ${hashedPassword}
    `;

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser(); 