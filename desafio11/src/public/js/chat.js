const containerChat = document.getElementById('hbs-chat');
function sendMessage() {
  let message = document.getElementById('message');
  let email = document.getElementById('email');
  let names = document.getElementById('names');
  let lastname = document.getElementById('lastname');
  let alias = document.getElementById('alias');
  let age = document.getElementById('age');

  socket.emit('client:newMessage', {
    author: {
      email: email.value,
      names: names.value,
      lastname: lastname.value,
      age: age.value,
      alias: alias.value,
      avatar:
        'https://st.depositphotos.com/1875497/3781/i/600/depositphotos_37810929-stock-photo-books-on-white.jpg',
    },
    text: message.value,
    dateTime: dayjs().format('DD/MM/YYYY HH:MM:ss'),
  });
}

function renderMessages(messages) {
  console.log(messages)
  let div = document.getElementById('chat-content');

  for (
    let index = div.childNodes.length - 1;
    index < messages.length;
    index++
  ) {
    const element = messages[index];
    let msg = document.createElement('span');

    msg.id = 'msg-' + index;
    msg.classList.add('msg');
    msg.innerHTML = "<div class='head'> " + element.author.email + ' </div>';
    msg.innerHTML += "<p class='body'> " + element.text + ' </p>';
    msg.innerHTML += "<div class='footer'> " + element.dateTime + ' </div>';
    div.appendChild(msg);
  }
}

socket.on('server:sendMessages', async (data) => {
  // SCHEMA NORMALIZR
  const author = new normalizr.schema.Entity(
    'author',
    {},
    { idAttribute: 'email' }
  );
  const messages = new normalizr.schema.Entity('messages');
  const schema = new normalizr.schema.Array({
    messages: messages,
    author: author,
  });
  const messagesDenormalizado = normalizr.denormalize(
    data.result,
    schema,
    data.entities
  );
  // VALUES
  const original = JSON.stringify(data.original).length;
  const dataNormalizr = JSON.stringify(data.result).length;

  const resp = await fetch('./chat.handlebars');
  const hbs = await resp.text();
  const template = Handlebars.compile(hbs);
  const html = template({ messagesDenormalizado });
  containerChat.innerHTML = html;
  renderMessages(messagesDenormalizado);
  getEmojis();
  console.log(original, dataNormalizr)
  const compressionValue = ((dataNormalizr/original ) * 100);
  document.getElementById(
    'compression'
  ).innerHTML = `<div class='head'> ${Math.ceil(compressionValue)} %</div>`;
});

function getEmojis() {
  let activated = false;
  let emojiBtn = document.getElementById('emoji');

  let emojiList = [
    '👍',
    '👌',
    '👏',
    '🙂',
    '😀',
    '😃',
    '😉',
    '😊',
    '😋',
    '😌',
    '😏',
    '😐',
    '😑',
    '😒',
    '😓',
    '😂',
    '🤣',
    '😅',
    '😆',
    '😜',
    '😙',
    '😘',
  ];
  emojiList.forEach((element) => {
    let list = document.getElementById('emoji-list');
    let node = document.createElement('span');
    node.classList.add('emoji');
    node.textContent = element;
    node.onclick = (ev) => {
      document.getElementById('message').value += node.textContent;
    };
    list.appendChild(node);
  });
  emojiBtn.onclick = function (evt) {
    activated = !activated;

    let list = document.getElementById('emoji-list');
    if (activated) {
      list.style.display = 'flex';
    } else {
      list.style.display = 'none';
    }
  };
}