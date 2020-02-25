DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workspaces;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS direct_messages;
DROP TABLE IF EXISTS apps;



CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  full_name varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  email varchar(255) NOT NULL,
  post_id int,
  comment_id int
);

CREATE TABLE workspaces (
  workspace_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  channel_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE channels (
  channel_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_id int NOT NULL,
  posts_id int NOT NULL,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

CREATE TABLE posts (
  posts_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  channel_id int NOT NULL,
  post_text text,
  image_link varchar(255),
  post_time timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY (channel_id) REFERENCES channels(posts_id),
  FOREIGN KEY (user_id) REFERENCES users(post_id)
);

CREATE TABLE comments (
  comment_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  post_id int NOT NULL,
  comment_text text,
  comment_time timestamp NOT NULL DEFAULT NOT(),
  FOREIGN KEY (post_id) REFERENCES posts(posts_id),
  FOREIGN KEY (user_id) REFERENCES users(comment_id)
);

CREATE TABLE direct_messages (
  direct_message_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_id int NOT NULL,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

CREATE TABLE apps (
  app_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_id int NOT NULL,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

--ALTER TABLE workspaces ADD FOREIGN KEY (user_id) REFERENCES users(id);
--ALTER TABLE channels ADD FOREIGN KEY (workspace_id) REFERENCES workspaces (workspace_id);
--ALTER TABLE posts ADD FOREIGN KEY (channel_id) REFERENCES channels (posts_id);
--ALTER TABLE comments ADD FOREIGN KEY (post_id) REFERENCES posts (posts_id);
--ALTER TABLE direct_messages ADD FOREIGN KEY (workspace_id) REFERENCES workspaces (workspace_id);
--ALTER TABLE apps ADD FOREIGN KEY (workspace_id) REFERENCES workspaces (workspace_id);
--ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (post_id);
--ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES users (comment_id);
