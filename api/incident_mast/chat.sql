1. Conversations Table
This is the chat room.

CREATE TABLE app_conversations (
    conversation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    module_name VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    parent_entity_id BIGINT NULL,
    incident_id BIGINT NULL,
    department_id INT NULL,
    section_id INT NULL,
    created_by INT NOT NULL,
    title VARCHAR(255),
    is_group_chat TINYINT DEFAULT 1,
    is_active TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

| conversation_id | module_name | entity_type    | entity_id | incident_id | department_id | section_id |
| --------------- | ----------- | -------------- | --------- | ----------- | ------------- | ---------- |
| 1               | INCIDENT    | ACTION_REQUEST | 25        | 1001        | 3             | 12         |


2. Conversation Participants
Who can access the chat.

CREATE TABLE app_conversation_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    emp_id INT NOT NULL,
    department_id INT NULL,
    section_id INT NULL,
    is_admin TINYINT DEFAULT 0,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

Supports:
permissions
participant list
unread tracking
notifications


3. Messages Table
ONLY THIS TABLE NEEDS utf8mb4.

CREATE TABLE app_messages (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    sender_emp_id INT NOT NULL,
    sender_name VARCHAR(255),
    message_type VARCHAR(50) DEFAULT 'TEXT',
    message TEXT
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci,
    reply_to_message_id BIGINT NULL,
    is_edited TINYINT DEFAULT 0,
    is_deleted TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

message_type Examples

TEXT
IMAGE
VIDEO
FILE
AUDIO
SYSTEM
ACTION_UPDATE


4. Attachments Table
Do NOT store files inside messages table.


CREATE TABLE app_message_attachments (
    attachment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id BIGINT NOT NULL,
    file_name VARCHAR(255),
    original_name VARCHAR(255),
    file_url VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by INT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

| file_name        | mime_type       |
| ---------------- | --------------- |
| incident_102.pdf | application/pdf |
| image1.png       | image/png       |


5. Seen / Unseen Table

CREATE TABLE app_message_reads (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id BIGINT NOT NULL,
    emp_id INT NOT NULL,
    seen_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

How It Works
If:
5 users see message
then:
5 rows inserted;


| message_id | emp_id |
| ---------- | ------ |
| 102        | 2001   |
| 102        | 2002   |


6. Emoji Reactions Table


CREATE TABLE app_message_reactions (
    reaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id BIGINT NOT NULL,
    emp_id INT NOT NULL,
    reaction VARCHAR(20)
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci,
    reacted_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;


7.  Notification Table

CREATE TABLE app_notifications (
    notification_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    conversation_id BIGINT,
    message_id BIGINT,
    title VARCHAR(255),
    is_read TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);