import { REQUEST_PARAM_TYPE } from '../nest-http.constants';

export const getRequestParams = (metadata, args) => {
  let query, body, params, headers;

  for (const key in metadata) {
    if (!metadata.hasOwnProperty(key)) {
      continue;
    }

    const meta = metadata[key];
    let value = `${meta.index}`.startsWith('const') ? meta.value : args[meta.index];
    if (meta.field) {
      value = { [meta.field]: value };
    }
    const type = key.split(':')[0];
    if (type === REQUEST_PARAM_TYPE.PARAM) {
        params = { ...params, ...value };
    } else if (type === REQUEST_PARAM_TYPE.QUERY) {
        query = { ...query, ...value };
    } else if (type === REQUEST_PARAM_TYPE.BODY) {
        body = { ...body, ...value };
    } else if (type === REQUEST_PARAM_TYPE.HEADER) {
        headers = { ...headers, ...value };
    }
  }
  return { query, body, params, headers };
};
