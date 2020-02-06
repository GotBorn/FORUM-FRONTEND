let ip = "http://192.168.43.188:3000";//ip адрес Максима
//let ip = "http://192.168.43.83:3000";//ip адрес Руслана
export async function login (login,password)
{
    let response = await fetch(ip + "/login?login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password));
    if (response.ok) {
      let body = await response.json();
      if (body.error){
        throw body.error;
      }
      let token = body.response;
      return token
    }
    else{
            throw new Error('Network Error');
        }
}
export async function getTopics (token)
{
    let response = await fetch(ip + "/getTopics?token=" + encodeURIComponent(token));
    if (response.ok) {
      let body = await response.json();
      if (body.error){
        throw body.error;
      }
      let topics = body.response;
      return topics
    }
    else{
            throw new Error('Network Error');
        }
}

export async function getMessages (token, topicId)
{
  let response = await fetch(ip + "/getMessages?token=" + encodeURIComponent(token) + "&id=" + encodeURIComponent(topicId));
  if (response.ok) {
    let body = await response.json();
    if (body.error){
      throw body.error;
    }
    let messages = body.response;
    return messages
    }
  else{
    throw new Error('Network Error');
  }
}

export async function sendMessage (token, topicId, text)
{
  let response = await fetch(ip + "/createMessage?token=" + encodeURIComponent(token) + 
      "&topicId=" + encodeURIComponent(topicId)+ "&text=" + encodeURIComponent(text));
  if (!response.ok) {
    return false;
  }
  else{
    return true;
  }
}