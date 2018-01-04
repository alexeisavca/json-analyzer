function analyze(data) {
  const result = {};
  if (Array.isArray(data)) {
    result.type = 'arrayof';
    result.shape = {};

    data.forEach(datum => {
      Object.keys(datum).forEach(key => {
        const value = datum[key];
        if (!result.shape[key]) {
          result.shape[key] = new Set();
        }

        if (typeof value === 'number') {
          result.shape[key].add('number');
        } else if (typeof value === 'string') {
          result.shape[key].add('string');
        } else if (value === null) {
          result.shape[key].add('null');
        }
    });
    });
  }

  return result;
}

function format(result) {
  let formatted = '';
  if (result.type === 'arrayof') {
    formatted += 'Array of {\n';
    Object.keys(result.shape).forEach(name => {
      const types = Array.from(result.shape[name]).join(' | ');
      formatted += `\t${name}: ${types}\n`;
    });
    formatted += '}';
  }
  return formatted;
}

console.log(
  format(
    analyze([{
      name: 'hui'
    }, {
      name: 1
    }, {
      name: null
    }, {
      value: 1
    }])
  )
);

