DROP DATABASE IF EXISTS slack_clone;
CREATE DATABASE slack_clone;
USE slack_clone;

CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  profile_picture_link VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE workspaces (
  workspace_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_name VARCHAR(255) NOT NULL,
  workspace_pic_link VARCHAR(255),
  channel_id int NOT NULL
);

CREATE TABLE user_workspaces (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT NOT NULL,
  workspace_id    INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

CREATE TABLE channels (
  channel_id int PRIMARY KEY AUTO_INCREMENT,
  channel_name VARCHAR(255) NOT NULL,
  workspace_id int NOT NULL,
  posts_id int,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

CREATE TABLE posts (
  posts_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  channel_id int NOT NULL,
  post_text text NOT NULL,
  image_link varchar(255),
  post_time timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY (channel_id) REFERENCES channels(channel_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  comment_id int PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  post_id int NOT NULL,
  comment_text text,
  comment_time timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY (post_id) REFERENCES posts(posts_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE direct_messages (
  direct_message_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_id int NOT NULL,
  receiver_id int NOT NULL,
  sender_id int NOT NULL,
  message_text VARCHAR(255),
  created_at  timestamp NOT NULL DEFAULT NOW(),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id),
  FOREIGN KEY (receiver_id) REFERENCES users(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);

CREATE TABLE apps (
  app_id int PRIMARY KEY AUTO_INCREMENT,
  workspace_id int NOT NULL,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id)
);

INSERT INTO users ( user_name, email, password_hash, profile_picture_link ) VALUES
  (
    'Timothy',
    'tim@tim.com',
    '$2b$12$Qyr91yvPWQeQb/7hF96u8etWQ0sNiKrLfhhh64lTOGrIRZcL0fpy2',
    'https://ca.slack-edge.com/TS07UEB19-USHJ29D2R-g05947c7423d-512'
  ),
  (
    'Bob',
    'bob@bob.com',
    '$2b$12$Qyr91yvPWQeQb/7hF96u8etWQ0sNiKrLfhhh64lTOGrIRZcL0fpy2',
    'https://ca.slack-edge.com/TMLRSLD7V-UMZ756VT2-g6e2fc16ae63-512'
  ),
  (
    'Sam',
    'sam@sam.com',
    '$2b$12$wiz/tWqqTvOzafdvLXzcs.GT2T54ckkQXLt3sFJx6SwnCf/5rxuka',
    'https://ca.slack-edge.com/TMLRSLD7V-UMSRE05LZ-g9eca382a0c2-512'
  )
  ;

INSERT INTO workspaces ( workspace_name, workspace_pic_link, channel_id ) VALUES
  ( 'FSWD', 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0015-44.png', 1 ),
  ( 'Armaan', 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0015-44.png', 1 ),
  ( 'Meech', 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0015-44.png', 1 )
  ;

INSERT INTO user_workspaces ( user_id, workspace_id ) VALUES
  ( 1, 1 ),
  ( 1, 2 ),
  ( 1, 3 ),
  ( 2, 1 ),
  ( 2, 3 ),
  ( 3, 1 ),
  ( 3, 3 )
  ;

INSERT INTO channels ( channel_name, workspace_id, posts_id ) VALUES
  ( 'general', 1, 1 ),
  ( 'random', 1, 2 ),
  ( 'questions', 1, 3 ),
  ( 'announcements', 1, 4 ),
  ( 'discussion', 1, 5 ),
  ( 'more random', 1, 6 ),
  ( 'general', 2, 7 ),
  ( 'random', 2, 8 ),
  ( 'armaan', 2, 9 ),
  ( 'announcements', 2, 10 ),
  ( 'discussion', 2, 11 ),
  ( 'more random', 2, 12 ),
  ( 'general', 3, 13 ),
  ( 'sam', 3, 14 ),
  ( 'questions', 3, 15 ),
  ( 'announcements', 3, 16 ),
  ( 'discussion', 3, 17 ),
  ( 'more random', 3, 18 )
  ;

INSERT INTO posts ( user_id, channel_id, post_text ) VALUES
  ( 1, 1, 'The quick brown fox jumped over the lazy dog' ),
  ( 2, 1, 'Lorem' ),
  ( 2, 1, 'Ipsum' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 1, 1, 'The quick brown fox jumped over the lazy dog' ),
  ( 2, 1, 'Dolor' ),
  ( 2, 1, 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet nulla facilisi morbi tempus iaculis. Dui ut ornare lectus sit amet est. Pharetra vel turpis nunc eget lorem dolor sed viverra. Tristique magna sit amet purus gravida quis blandit turpis cursus. Mauris vitae ultricies leo integer. Mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies lacus sed turpis tincidunt id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Id diam maecenas ultricies mi eget. Vel risus commodo viverra maecenas accumsan lacus vel. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. At quis risus sed vulputate odio ut. Ac auctor augue mauris augue. Dignissim convallis aenean et tortor at risus. Commodo ullamcorper a lacus vestibulum sed arcu non.' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 1, 1, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' ),
  ( 1, 1, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 2, 1, 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet nulla facilisi morbi tempus iaculis. Dui ut ornare lectus sit amet est. Pharetra vel turpis nunc eget lorem dolor sed viverra. Tristique magna sit amet purus gravida quis blandit turpis cursus. Mauris vitae ultricies leo integer. Mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies lacus sed turpis tincidunt id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Id diam maecenas ultricies mi eget. Vel risus commodo viverra maecenas accumsan lacus vel. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. At quis risus sed vulputate odio ut. Ac auctor augue mauris augue. Dignissim convallis aenean et tortor at risus. Commodo ullamcorper a lacus vestibulum sed arcu non.' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 1, 1, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 2, 1, 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet nulla facilisi morbi tempus iaculis. Dui ut ornare lectus sit amet est. Pharetra vel turpis nunc eget lorem dolor sed viverra. Tristique magna sit amet purus gravida quis blandit turpis cursus. Mauris vitae ultricies leo integer. Mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies lacus sed turpis tincidunt id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Id diam maecenas ultricies mi eget. Vel risus commodo viverra maecenas accumsan lacus vel. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. At quis risus sed vulputate odio ut. Ac auctor augue mauris augue. Dignissim convallis aenean et tortor at risus. Commodo ullamcorper a lacus vestibulum sed arcu non.' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 1, 1, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' ),
  ( 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 1, 2, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' ),
  ( 2, 2, 'Lorem' ),
  ( 2, 2, 'Ipsum' ),
  ( 1, 2, 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet nulla facilisi morbi tempus iaculis. Dui ut ornare lectus sit amet est. Pharetra vel turpis nunc eget lorem dolor sed viverra. Tristique magna sit amet purus gravida quis blandit turpis cursus. Mauris vitae ultricies leo integer. Mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies lacus sed turpis tincidunt id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Id diam maecenas ultricies mi eget. Vel risus commodo viverra maecenas accumsan lacus vel. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. At quis risus sed vulputate odio ut. Ac auctor augue mauris augue. Dignissim convallis aenean et tortor at risus. Commodo ullamcorper a lacus vestibulum sed arcu non.' ),
  ( 1, 2, 'The quick brown fox jumped over the lazy dog' ),
  ( 2, 5, 'Dolor' ),
  ( 1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non molestie urna. Suspendisse dolor lacus, suscipit id malesuada et, congue id sem. Praesent ut sollicitudin nisl. Fusce mollis, urna ut feugiat imperdiet, odio orci mollis nunc, quis imperdiet quam urna vel erat. Nam auctor sed nulla vel venenatis. Nullam ac risus ut est scelerisque molestie. Fusce sed euismod lorem, sed tempus neque. Sed dignissim, libero sed faucibus mollis, felis tellus laoreet leo, at pretium nunc libero ut justo. Proin sagittis interdum bibendum. Aenean sit amet neque erat. Nulla quis maximus ligula. Integer egestas feugiat metus, in aliquet sem rutrum consequat.' ),
  ( 2, 5, 'Lorem' ),
  ( 2, 5, 'Ipsum' ),
  ( 1, 5, 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet nulla facilisi morbi tempus iaculis. Dui ut ornare lectus sit amet est. Pharetra vel turpis nunc eget lorem dolor sed viverra. Tristique magna sit amet purus gravida quis blandit turpis cursus. Mauris vitae ultricies leo integer. Mauris nunc congue nisi vitae suscipit tellus mauris. Ultricies lacus sed turpis tincidunt id. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Id diam maecenas ultricies mi eget. Vel risus commodo viverra maecenas accumsan lacus vel. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. At quis risus sed vulputate odio ut. Ac auctor augue mauris augue. Dignissim convallis aenean et tortor at risus. Commodo ullamcorper a lacus vestibulum sed arcu non.' ),
  ( 1, 5, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' ),
  ( 2, 5, 'Dolor' ),
  ( 2, 5, 'Dolor' ),
  ( 1, 7, 'Aliquet bibendum enim facilisis gravida neque. Imperdiet massa tincidunt nunc pulvinar. Scelerisque felis imperdiet proin fermentum leo. Porta lorem mollis aliquam ut porttitor leo. Tellus in hac habitasse platea dictumst. Volutpat sed cras ornare arcu dui vivamus. Sed arcu non odio euismod. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Eu facilisis sed odio morbi quis commodo. Diam volutpat commodo sed egestas egestas.' )
  ;

INSERT INTO direct_messages ( workspace_id, receiver_id, sender_id, message_text ) VALUES
  ( 1, 1, 1, 'the quick brown fox jumped over the lazy dog' )
  ;
