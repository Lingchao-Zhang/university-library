import { 
    pgTable,
    uuid,
    varchar,
    integer, 
    text, 
    timestamp, 
    pgEnum
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum("status", ["Pending", "Approved", "Rejected"])
export const rolesEnum = pgEnum("roles", ["User", "Admin"])

export const usersTable = pgTable('users_table', {
  id: uuid("id").notNull().primaryKey().unique().defaultRandom(),
  fullName: varchar("full_name", {length: 256}).notNull(),
  email: varchar("email").notNull(),
  universityId: integer("university_id").notNull().unique(),
  password: varchar("password", {length: 20}).notNull(),
  universityCard: text("university_card").notNull(),
  status: statusEnum().default("Pending"),
  role: rolesEnum().default("User"),
  createdAt: timestamp().notNull().defaultNow(),
  lastActivityTime: timestamp("last_activity_time").notNull().defaultNow(),
});



    


