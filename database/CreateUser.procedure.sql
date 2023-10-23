DROP PROCEDURE IF EXISTS CreateUser;
CREATE PROCEDURE IF NOT EXISTS CreateUser (
  IN name VARCHAR(255),
  IN username VARCHAR(255),
  IN password VARCHAR(255),
  IN email VARCHAR(255)
)
BEGIN
  DECLARE settings_id VARCHAR(36);
  SET settings_id = UUID();
  DECLARE user_id VARCHAR(36);
  SET user_id = UUID();

  INSERT INTO maduchat.settings
  (id,
   language,
   showAvatar
  )
  VALUES
  (settings_id,
   'English',
   1
  );
  
  INSERT INTO maduchat.user
  (id,
   name,
   username,
   password,
   email,
   settingsId
  )
  VALUES
  (user_id,
   name,
   username,
   password,
   email,
   (SELECT id
    FROM settings s
    WHERE s.id = settings_id
   )
  );

  INSERT INTO maduchat.chatmembers
  (chatId,
   userId
  )
  VALUES
  ((SELECT id
    FROM chat
    WHERE id = 'global'
    ),
    (SELECT id
     FROM user
     WHERE id = user_id
    )
  );
END;