DROP PROCEDURE IF EXISTS CreateGlobalchat;
CREATE PROCEDURE IF NOT EXISTS CreateGlobalchat()
BEGIN
  INSERT INTO maduchat.chat
  (id,
   name
  )
  VALUES
  ('global',
   'Global'
  );
END;
