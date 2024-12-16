'use client';
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
// import { pusherClient } from '../utils/pusher';
// import { initSocket, getSocket } from '../../socket';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  var pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    forceTLS: true,
  });
  var channel = pusherClient.subscribe('private-chat');
  channel.bind('helloMessage', (data) => {
    // console.log('test', data);
    alert(JSON.stringify(data));
    // setMessages([...messages, data]);
  });

  // useEffect(() => {
  //   const channel = pusherClient.subscribe('private-chat');
  //   channel.bind('helloMessage', (data) => {
  //     console.log('test', data);
  //     alert('test', JSON.stringify(data));
  //     // setMessages([...messages, data]);
  //   });

  //   return () => {
  //     channel.unbind('helloMessage');
  //     pusherClient.unsubscribe('private-chat');
  //   };
  // }, [messages]);

  const handleTestClick = async () => {
    let data = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: 'private-chat',
        event: 'helloMessage',
        message: 'Hello, this is real time!',
      }),
    });
    let json = await data.json();

    // console.log(json);

    setMessages([...messages, json]);
  };

  return (
    <div>
      <div>
        <h1>Real-Time Chat</h1>
        {messages?.map((message, index) => (
          <div className="border border-slate-600 rounded p-2 m-2" key={index}>
            {message.message}
          </div>
        ))}
        <button onClick={handleTestClick}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
