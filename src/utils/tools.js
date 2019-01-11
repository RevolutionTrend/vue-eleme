const convertImagePath = str => {
  const host = '//fuss10.elemecdn.com';

  const urlFlag = /\/dist|static\.alpha\.elenet\.me|static\.beta\.elenet\.me|static\.elenet\.me|static11\.elemecdn\.com|(faas|shadow)\.elemecdn\.com|cdn\.faas\.elenet\.me/.test(str);
  if (urlFlag) {
    return 'https:' + str.replace(/\|(\d+)x(\d+)/, '');
  }

  str = host + str.replace("http:", "").replace(host, "").replace(/^(\w)(\w\w)(\w{29}(\w*))(.+)?$/, "/$1/$2/$3.$4");
  const matchStr = str.match(/\|(\d+)x(\d+)/);
  if (!matchStr) {
    return 'https:' + str + '?imageMogr2/format/webp/quality/85';
  }

  let finalStr = str.split('|')[0];
  const width = matchStr[1],
    height = matchStr[2];
  return 'https:' + finalStr + '?imageMogr2/thumbnail/' + width + 'x' + height + '/format/webp/quality/85';
}

const globalTools = {
  convertImagePath
};
export default globalTools;