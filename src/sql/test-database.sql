DROP TABLE IF EXISTS apps;
DROP TABLE IF EXISTS direct_messages;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS user_workspaces;
DROP TABLE IF EXISTS workspaces;
DROP TABLE IF EXISTS users;



CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE workspaces (
  workspace_id int PRIMARY KEY AUTO_INCREMENT,
  channel_id int NOT NULL
);

CREATE TABLE user_workspaces (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT,
  workspace_id    INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

CREATE TABLE channels (
  channel_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_id int NOT NULL,
  posts_id int NOT NULL,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

CREATE TABLE posts (
  posts_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  channel_id int,
  post_text text,
  image_link varchar(255),
  post_time timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY (channel_id) REFERENCES channels(channel_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  comment_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  post_id int,
  comment_text text,
  comment_time timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY (post_id) REFERENCES posts(posts_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
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


INSERT INTO users (full_name, email, password)
VALUES
('user1', 'email1', 'pass'),
('user2', 'email2', 'pass'),
('user3', 'email3', 'pass'),
('user4', 'email4', 'pass'),
('user5', 'email5', 'pass');

INSERT INTO workspaces (user_id, channel_id)
VALUES
(1, 1);

INSERT INTO channels (workspace_id, posts_id)
VALUES
(1, 1);

INSERT INTO posts (user_id, channel_id, post_text, image_link)
VALUES
(1, 1, 'hello world!', 'https://www.dailydot.com/wp-content/uploads/2018/10/olli-the-polite-cat.jpg'),
(2, 1, 'memes', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/womanyellingcat-1573233850.jpg?resize=480:*');