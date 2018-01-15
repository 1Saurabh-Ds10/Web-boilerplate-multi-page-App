
import $ from 'jquery';

const _BASE_URL = '';
const sendOrReceiveRequest = ({
  async = false,
  url,
  dataType = 'json',
  type,
  data
} = {}) => {
  try {
    return $.ajax({
      type,
      url,
      data,
      async,
      dataType,
      timeout: 40000,
      crossDomain: true
    });
  } catch (err) {
    alert('Something went wrong');
  }
};

const getReq = ({
  async = false,
  url,
  dataType = 'json',
  data
} = {}) => {
  const type = 'GET';
  const URL = _BASE_URL + url;
  return sendOrReceiveRequest({async, url: URL, data, dataType, type});
};

const postReq = ({
  async = false,
  url,
  dataType = 'json',
  data
} = {}) => {
  const type = 'POST';
  const URL = _BASE_URL + url;
  return sendOrReceiveRequest({async, url: URL, data, dataType, type});
};

export {
  getReq,
  postReq
};
