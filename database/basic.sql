SHOW TABLES;

-- Basic select statements
SELECT * FROM chat;
SELECT * FROM chatadmins;
SELECT * FROM chatmembers;
SELECT * FROM friendrequests;
SELECT * FROM friends;
SELECT * FROM message;
SELECT * FROM settings;
SELECT * FROM user;

-- Get Types of tables
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'chat';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'chatadmins';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'chatmembers';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'friendrequests';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'friends';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'message';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'settings';
SELECT COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE `TABLE_NAME` = 'user';

-- Joins
SELECT 
  m.id AS message_id,
  m.message,
  m.createdAt,
  c.id AS chat_id,
  c.name AS chat_name,
  u.id AS user_id,
  u.email,
  u.image,
  u.isAdmin,
  u.isOnline,
  u.isVerified,
  u.name AS user_name,
  u.password,
  u.settingsId,
  u.username
FROM message m
LEFT JOIN chat c ON c.id = m.chatId
LEFT JOIN user u ON u.id = m.authorId;

