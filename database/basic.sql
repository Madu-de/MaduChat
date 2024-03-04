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






INSERT INTO review (id, authorId, targetId, text, stars) VALUES (UUID(), '0afefcc5-2b53-43d0-aad0-4f54eb90ee4d', '22094c72-7425-11ee-b3cb-0242ac120003', 'A good person!', 5);
INSERT INTO review (id, authorId, targetId,text, stars) VALUES (UUID(), '0afefcc5-2b53-43d0-aad0-4f54eb90ee4d', '220ce59f-7425-11ee-b3cb-0242ac120003', 'I hate him!', 1);
INSERT INTO review (id, authorId, targetId,text, stars) VALUES (UUID(), '0afefcc5-2b53-43d0-aad0-4f54eb90ee4d', '2213cb15-7425-11ee-b3cb-0242ac120003', 'She said, that I am a nerd', 5);
INSERT INTO review (id, authorId, targetId,text, stars) VALUES (UUID(), '0afefcc5-2b53-43d0-aad0-4f54eb90ee4d', 'fcdc002b-6c59-403b-a2f8-3f59895dcb25', 'I love this guy!', 4);