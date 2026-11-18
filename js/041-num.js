const num = (id) => (/^p\d+$/.test(id) ? +id.slice(1) : 0);
