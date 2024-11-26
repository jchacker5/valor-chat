import { db } from '../lib/db'
import { users } from '../lib/db/schema'

async function checkUsers() {
  try {
    const allUsers = await db.select().from(users)
    console.log('Existing users:', allUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
  }
  process.exit(0)
}

checkUsers() 