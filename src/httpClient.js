const doGetRequest = async (path, category) => {
  try {
    const response = await fetch(path);
    const data = await response.json();

    if (data.error)
      throw(data);

    return data;
  } catch(error) {
    console.error(`Failed to fetch ${category}: ${JSON.stringify(error)}`);
    return {error: error};
  }
};

const doDeleteRequest = async (path, category) => {
  try {
    const response = await fetch(path, {method: "DELETE"});
    if (response.ok)
      return {};

    const data = await response.json()

    if (data.error)
      throw(data);

    return data;
  } catch(error) {
    console.error(`Failed to fetch ${category}: ${JSON.stringify(error)}`);
    return {error: error};
  }
};

const doPostRequest = (path, category, body) => {
  return doRequestWithBody("POST", path, category, body)
};

const doPutRequest = (path, category, body) => {
  return doRequestWithBody("PUT", path, category, body)
};

const doRequestWithBody = async (type, path, category, body) => {
  try {
    const response = await fetch(path, {
      method: type,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if (data.error)
      throw(data);

    return data;
  } catch(error) {
    console.error(`Failed to ${type} ${category}: ${JSON.stringify(error)}`);
    return {error: error};
  }
};

export { doGetRequest, doPostRequest, doPutRequest, doDeleteRequest };
