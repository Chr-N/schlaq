exports.messages = [
  {
    id: "1",
    content: "This is a message",
    username: "sam",
    avatarImage: "https://cdn.discordapp.com/attachments/620095242728636416/681630720581828612/unknown.png"
  }
]

exports.getMessages = (callback) => {
  setTimeout(() => {
    callback(null, messages)
  }, 0)
}
