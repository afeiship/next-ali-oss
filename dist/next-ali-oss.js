(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var Oss = global.OSS || require('ali-oss');

  var NxAliOss = nx.declare('nx.AliOss', {
    statics: {
      _instance: null,
      getInstance: function (inOssToken) {
        return this._instance = this._instance || new NxAliOss(inOssToken);
      }
    },
    properties: {
      client: {
        get: function () {
          return this._client || null;
        }
      }
    },
    methods: {
      init: function (inOssToken) {
        this._client = new Oss.Wrapper(inOssToken);
      },
      uploads: function (inArray) {
        var self = this;
        var promiseList = nx.map(inObject, function (_, item) {
          var name = item.name;
          var file = item.file;
          var options = item.options;
          return this._client.multipartUpload(name, file, options);
        });
        return Promis.all(promiseList);
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAliOss;
  }

}());
